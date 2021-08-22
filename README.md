# sizexceed
 Find Size Exceeded Files
 
 ![npm](https://img.shields.io/npm/dm/sizexceed?style=flat-square)

## Install
```bash
npm i sizexceed
```

## Usage

### Create Instance
```javascript
const sizexceed = require("sizexceed");
// import sizexceed from "sizexceed";

const se = new sizexceed("./files");
```

#### .dir(path)
```javascript
// change root dir to "./files/img"
se.dir("./files/img");
```

### Add Filters
#### .filter({ name, max, min, ignore, only })
```javascript
se.filter({
    name: "Video Files Larger Than 1GB",
    max: "1G", // or "1GB" or (1 * 1024 * 1024 * 1024)
    only: [".mp4", ".avi", ".webm", ".m4v", ".mov"] // CaSe InSeNsItIvE
});
```

#### .max(size, { name, ignore, only })
```javascript
se.max("100M", {
    name: "Text Files Larger Than 100MB",
    only: ".txt"
});
```

#### .min(size, { name, ignore, only })
```javascript
se.min("10K", {
    name: "Other Files Smaller Than 10KB",
    ignore: [".txt"]
});
```

### Do Tests
#### .test()
```javascript
// After Adding Filters:
const result = se.test();
console.log(result);
// {
//     passed: [ ... ]
//     failed: [ ... ]
// }
```
#### .clear()
```javascript
// Clear All Filters
se.clear();
```