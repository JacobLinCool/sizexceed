const fs = require("fs");
const sizexceed = require("../index");

// Create Test Files
beforeAll(() => {
    if (!fs.existsSync("./test")) fs.mkdirSync("./test");
    if (!fs.existsSync("./test/tmp")) fs.mkdirSync("./test/tmp");
    fs.writeFileSync("./test/tmp/100K.tfile", "0".repeat(100 * 1024));
    fs.writeFileSync("./test/tmp/100K1.tfile", "0".repeat(100 * 1024 + 1));
    fs.writeFileSync("./test/tmp/1M.tfile", "0".repeat(1 * 1024 * 1024));
    fs.writeFileSync("./test/tmp/1M1.tfile", "0".repeat(1 * 1024 * 1024 + 1));
    fs.writeFileSync("./test/tmp/10M.tfile", "0".repeat(10 * 1024 * 1024));
    fs.writeFileSync("./test/tmp/10M1.tfile", "0".repeat(10 * 1024 * 1024 + 1));
    fs.writeFileSync("./test/tmp/100M.tfile", "0".repeat(100 * 1024 * 1024));
    fs.writeFileSync("./test/tmp/100M1.tfile", "0".repeat(100 * 1024 * 1024 + 1));
    fs.writeFileSync("./test/tmp/100M1.tfile2", "0".repeat(100 * 1024 * 1024 + 1));
});

// Delete Test Files
afterAll(() => {
    fs.unlinkSync("./test/tmp/100K.tfile");
    fs.unlinkSync("./test/tmp/100K1.tfile");
    fs.unlinkSync("./test/tmp/1M.tfile");
    fs.unlinkSync("./test/tmp/1M1.tfile");
    fs.unlinkSync("./test/tmp/10M.tfile");
    fs.unlinkSync("./test/tmp/10M1.tfile");
    fs.unlinkSync("./test/tmp/100M.tfile");
    fs.unlinkSync("./test/tmp/100M1.tfile");
    fs.unlinkSync("./test/tmp/100M1.tfile2");
});

describe("max()", () => {
    test(`max("100K")`, () => {
        const result = new sizexceed("./test/tmp").max("100K").test();
        console.log(result);
        expect(result.passed.length).toBe(1);
        expect(result.failed.length).toBe(8);
    });
    test(`max("100K") with ignore`, () => {
        const result = new sizexceed("./test/tmp").max("100K", { ignore: [".tfile"] }).test();
        console.log(result);
        expect(result.passed.length).toBe(8);
        expect(result.failed.length).toBe(1);
    });
    test(`max("100K") with only`, () => {
        const result = new sizexceed("./test/tmp").max("100K", { only: [".tfile"] }).test();
        console.log(result);
        expect(result.passed.length).toBe(2);
        expect(result.failed.length).toBe(7);
    });
});

describe("min()", () => {
    test(`min("10M")`, () => {
        const result = new sizexceed("./test/tmp").min("10M").test();
        console.log(result);
        expect(result.passed.length).toBe(5);
        expect(result.failed.length).toBe(4);
    });
    test(`min("10M") with ignore`, () => {
        const result = new sizexceed("./test/tmp").min("10M", { ignore: [".tfile"] }).test();
        console.log(result);
        expect(result.passed.length).toBe(9);
        expect(result.failed.length).toBe(0);
    });
    test(`min("10M") with only`, () => {
        const result = new sizexceed("./test/tmp").min("10M", { only: [".tfile"] }).test();
        console.log(result);
        expect(result.passed.length).toBe(5);
        expect(result.failed.length).toBe(4);
    });
});
