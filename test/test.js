const fs = require("fs");
const sizexceed = require("../index");

// Create Test Files
beforeAll(() => {
    fs.writeFileSync("./test/100K.tfile", "0".repeat(100 * 1024));
    fs.writeFileSync("./test/100K1.tfile", "0".repeat(100 * 1024 + 1));
    fs.writeFileSync("./test/1M.tfile", "0".repeat(1 * 1024 * 1024));
    fs.writeFileSync("./test/1M1.tfile", "0".repeat(1 * 1024 * 1024 + 1));
    fs.writeFileSync("./test/10M.tfile", "0".repeat(10 * 1024 * 1024));
    fs.writeFileSync("./test/10M1.tfile", "0".repeat(10 * 1024 * 1024 + 1));
    fs.writeFileSync("./test/100M.tfile", "0".repeat(100 * 1024 * 1024));
    fs.writeFileSync("./test/100M1.tfile", "0".repeat(100 * 1024 * 1024 + 1));
    fs.writeFileSync("./test/100M1.tfile2", "0".repeat(100 * 1024 * 1024 + 1));
});

// Delete Test Files
afterAll(() => {
    fs.unlinkSync("./test/100K.tfile");
    fs.unlinkSync("./test/100K1.tfile");
    fs.unlinkSync("./test/1M.tfile");
    fs.unlinkSync("./test/1M1.tfile");
    fs.unlinkSync("./test/10M.tfile");
    fs.unlinkSync("./test/10M1.tfile");
    fs.unlinkSync("./test/100M.tfile");
    fs.unlinkSync("./test/100M1.tfile");
    fs.unlinkSync("./test/100M1.tfile2");
});

describe("Max Size", () => {
    test("MAX: Unset (100M)", async () => {
        const result = await sizexceed({ path: "./test" });
        expect(result.length).toBe(2);
        // 100M1.tfile & 100M1.tfile2
    });
    test("MAX: 100K", async () => {
        const result = await sizexceed({ path: "./test", max: "100K" });
        expect(result.length).toBe(8);
        // 100K1.tfile & 1M.tfile & 1M1.tfile & 10M.tfile & 10M1.tfile & 100M.tfile & 100M1.tfile & 100M1.tfile2
    });
    test("MAX: 1M", async () => {
        const result = await sizexceed({ path: "./test", max: "1M" });
        expect(result.length).toBe(6);
        // 1M1.tfile & 10M.tfile & 10M1.tfile & 100M.tfile & 100M1.tfile & 100M1.tfile2
    });
    test("MAX: 10M", async () => {
        const result = await sizexceed({ path: "./test", max: "10M" });
        expect(result.length).toBe(4);
        // 10M1.tfile & 100M.tfile & 100M1.tfile & 100M1.tfile2
    });
    test("MAX: 100M", async () => {
        const result = await sizexceed({ path: "./test", max: "100M" });
        expect(result.length).toBe(2);
        // 100M1.tfile & 100M1.tfile2
    });
    test("MAX: 1G", async () => {
        const result = await sizexceed({ path: "./test", max: "1G" });
        expect(result.length).toBe(0);
        // No file larger than 1G
    });
});

describe("Ignore Ext", () => {
    test("Ignore .tfile", async () => {
        const result = await sizexceed({ path: "./test", ignore: [".tfile"] });
        expect(result.length).toBe(1);
        // 100M1.tfile2
    });
    test("Ignore .tfile & .tfile2", async () => {
        const result = await sizexceed({ path: "./test", ignore: [".tfile", ".tfile2"] });
        expect(result.length).toBe(0);
        // No file
    });
});

describe("Only Ext", () => {
    test("Only .tfile", async () => {
        const result = await sizexceed({ path: "./test", only: [".tfile"] });
        expect(result.length).toBe(1);
        // 100M1.tfile
    });
    test("Only .tfile & .tfile2", async () => {
        const result = await sizexceed({ path: "./test", only: [".tfile", ".tfile2"] });
        expect(result.length).toBe(2);
        // 100M1.tfile & 100M1.tfile2
    });
});
