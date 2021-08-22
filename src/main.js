const fs = require("fs");
const { sizeStringToBytes, bytesToSizeString } = require("./utils");

function getFileList(path) {
    if (!fs.statSync(path).isDirectory()) return [path];

    const files = fs.readdirSync(path);
    const fileList = [];
    for (const file of files) {
        const filePath = `${path}/${file}`;
        if (fs.statSync(filePath).isDirectory()) fileList.push(...getFileList(filePath));
        else fileList.push(filePath);
    }
    return fileList;
}

class sizexceed {
    constructor(dir = ".") {
        this.root = dir;
        this.filters = [];
    }

    dir(dir) {
        this.root = dir;
        return this;
    }

    filter({ name = null, max = Infinity, min = 0, ignore = [], only = [] } = {}) {
        if (typeof name !== "string") name = `Filter ${this.filters.length + 1}`;
        if (typeof max === "string") max = sizeStringToBytes(max);
        if (typeof min === "string") min = sizeStringToBytes(min);
        if (typeof max !== "number" || typeof min !== "number") throw new Error("Error Input: MAX or MIN");

        if (Array.isArray(ignore)) true;
        else if (ignore && typeof ignore === "string") ignore = [ignore];
        else throw new Error("Error Input: IGNORE");
        ignore = ignore.map((ext) => ext.toLowerCase());
        if (Array.isArray(only)) true;
        else if (only && typeof only === "string") only = [only];
        else throw new Error("Error Input: ONLY");
        only = only.map((ext) => ext.toLowerCase());
        this.filters.push({ max, min, ignore, only });
        return this;
    }

    max(size, { name = null, ignore = [], only = [] } = {}) {
        return this.filter({ name, max: size, min: 0, ignore, only });
    }

    min(size, { name = null, ignore = [], only = [] } = {}) {
        return this.filter({ name, max: Infinity, min: size, ignore, only });
    }

    clear() {
        this.filters = [];
        return this;
    }

    test() {
        let failed = [];
        let passed = getFileList(this.root);
        for (const filter of this.filters) {
            const { max, min, ignore, only } = filter;
            let remove = [];
            passed.forEach((file, idx) => {
                let check = true;
                if (only.length) {
                    let flag = false;
                    for (const ext of only) {
                        if (file.toLowerCase().endsWith(ext)) {
                            flag = true;
                            break;
                        }
                    }
                    check = flag;
                } else if (ignore.length) {
                    for (const ext of ignore) {
                        if (file.toLowerCase().endsWith(ext)) {
                            check = false;
                            break;
                        }
                    }
                }

                if (check) {
                    const stat = fs.statSync(file);
                    const size = stat.size;

                    if (size > max) {
                        failed.push({
                            path: file,
                            size: bytesToSizeString(size),
                            stat,
                            filter,
                            reason: "max",
                        });
                        remove.push(idx);
                    } else if (size < min) {
                        failed.push({
                            path: file,
                            size: bytesToSizeString(size),
                            stat,
                            filter,
                            reason: "min",
                        });
                        remove.push(idx);
                    }
                }
            });
            for (let i = remove.length - 1; i >= 0; i--) passed.splice(remove[i], 1);
        }

        passed = passed.map((file) => {
            const stat = fs.statSync(file);
            const size = stat.size;
            return {
                path: file,
                size: bytesToSizeString(size),
                stat,
            };
        });

        return { passed, failed };
    }
}

exports.sizexceed = sizexceed;
