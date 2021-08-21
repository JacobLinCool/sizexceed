const fs = require("fs");
const sizexceed = require("sizexceed");

// create files for example
(() => {
    if (!fs.existsSync("./files")) fs.mkdirSync("./files");
    fs.writeFileSync("./files/100K.tfile", "0".repeat(100 * 1024));
    fs.writeFileSync("./files/100K1.tfile", "0".repeat(100 * 1024 + 1));
    fs.writeFileSync("./files/1M.tfile", "0".repeat(1 * 1024 * 1024));
    fs.writeFileSync("./files/1M1.tfile", "0".repeat(1 * 1024 * 1024 + 1));
    fs.writeFileSync("./files/1M1.txt", "0".repeat(1 * 1024 * 1024 + 1));
})();

// sizexceed example
(async () => {
    const FilesLargerThan1MB = await sizexceed({ path: "./files", max: "1M" });
    console.log("FilesLargerThan1MB: ", FilesLargerThan1MB);

    const NotTxtLargerThan100KB = await sizexceed({ path: "./files", max: "100K", ignore: [".txt"] });
    console.log("NotTxtLargerThan100KB: ", NotTxtLargerThan100KB);

    const TxtLargerThan100KB = await sizexceed({ path: "./files", max: "100K", only: [".txt"] });
    console.log("TxtLargerThan100KB: ", TxtLargerThan100KB);
})();
