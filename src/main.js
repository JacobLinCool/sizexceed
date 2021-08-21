const fs = require("fs");
const { sizeStringToBytes, bytesToSizeString } = require("./utils");

async function sizexceed({ path = ".", ignore = [".DS_Store"], only = [], max = "100MB" } = {}) {
    const maxSize = sizeStringToBytes(max);
    const files = await getFileList({ path, ignore, only });
    const tests = files
        .map((file) => checkFileSize(file, maxSize))
        .filter((test) => !test.passed)
        .map((result) => ({
            path: result.path,
            size: result.size,
        }));
    return tests;
}

async function getFileList({ path, ignore = [".DS_Store"], only = [] }) {
    try {
        const files = fs.readdirSync(path);
        const fileList = [];
        for (const file of files) {
            const filePath = `${path}/${file}`;
            if (fs.statSync(filePath).isDirectory()) {
                fileList.push(...(await getFileList({ path: filePath, ignore, only })));
            } else if (only.length) {
                for (const onlyExt of only) {
                    if (file.endsWith(onlyExt)) {
                        fileList.push(filePath);
                        break;
                    }
                }
            } else {
                let ignoreFlag = false;
                for (const ignoreExt of ignore) {
                    if (file.endsWith(ignoreExt)) {
                        ignoreFlag = true;
                        break;
                    }
                }
                if (!ignoreFlag) fileList.push(filePath);
            }
        }
        return fileList;
    } catch (err) {
        console.error(err.message);
        console.log(path, ignore, only);
    }
}

function checkFileSize(path, maxSize) {
    const size = fs.statSync(path).size;

    return {
        passed: size <= maxSize,
        path,
        size: bytesToSizeString(size),
    };
}

exports.sizexceed = sizexceed;
