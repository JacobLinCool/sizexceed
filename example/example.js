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
    const se = new sizexceed("./files");

    const FilesLargerThan1MB = se.max("1M").test();
    console.log("FilesLargerThan1MB Result: ", FilesLargerThan1MB);
    se.clear(); // clear filters

    const TxtLargerThan100KB = se.max("100K").test();
    console.log("TxtLargerThan100KB Result: ", TxtLargerThan100KB);
    se.clear(); // clear filters

    // chain example
    se.filter({ name: "Text file larger than 30MB", max: "30M", only: ".txt" });
    // equals to: se.max("30M", { name: "Text file larger than 30MB", only: ".txt" });
    se.filter({ name: "Image file larger than 100MB", max: "100M", only: [".jpg", ".png"] });
    // equals to: se.max("100M", { name: "Image file larger than 100MB", only: [".jpg", ".png"] });
    se.filter({ name: "Video file larger than 1GB", max: "1G", only: [".mp4", ".avi"] });
    // equals to: se.max("1G", { name: "Video file larger than 1GB", only: [".mp4", ".avi"] });
    se.filter({ name: "Other file smaller than 5KB", min: "5K", ignore: [".txt", ".jpg", ".png", ".mp4", ".avi"] });
    // equals to: se.min("5K", { name: "Other file smaller than 5KB", ignore: [".txt", ".jpg", ".png", ".mp4", ".avi"] });

    const ChainExampleResult = se.test();
    console.log("ChainExample Result: ", ChainExampleResult);
    se.clear(); // clear filters
})();

// delete files for example
(() => {
    if (fs.existsSync("./files")) fs.rmdirSync("./files");
})();
