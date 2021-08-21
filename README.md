# sizexceed
 Find Size Exceeded Files

## Install
Run:
```bash
npm i sizexceed
```

## Usage
```javascript
const sizexceed = require("sizexceed");
// import sizexceed from "sizexceed";

const FilesLargerThan1MB = await sizexceed({ path: "./files", max: "1M" });
console.log("FilesLargerThan1MB: ", FilesLargerThan1MB);

const NotTxtLargerThan100KB = await sizexceed({ path: "./files", max: "100K", ignore: [".txt"] });
console.log("NotTxtLargerThan100KB: ", NotTxtLargerThan100KB);

const TxtLargerThan100KB = await sizexceed({ path: "./files", max: "100K", only: [".txt"] });
console.log("TxtLargerThan100KB: ", TxtLargerThan100KB);
```

