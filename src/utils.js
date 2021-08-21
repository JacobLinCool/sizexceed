function sizeStringToBytes(sizeString) {
    sizeString = sizeString.toUpperCase();
    const size = sizeString.match(/\d+/g)[0] ? +sizeString.match(/\d+/g)[0] : 0;
    if (sizeString.endsWith("K") || sizeString.endsWith("KB")) return size * 1024;
    if (sizeString.endsWith("M") || sizeString.endsWith("MB")) return size * 1024 * 1024;
    if (sizeString.endsWith("G") || sizeString.endsWith("GB")) return size * 1024 * 1024 * 1024;
    if (sizeString.endsWith("T") || sizeString.endsWith("TB")) return size * 1024 * 1024 * 1024 * 1024;
    return size;
}

function bytesToSizeString(bytes) {
    if (bytes < 1024) return bytes + "B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + "KB";
    if (bytes < 1024 * 1024 * 1024) return (bytes / 1024 / 1024).toFixed(2) + "MB";
    if (bytes < 1024 * 1024 * 1024 * 1024) return (bytes / 1024 / 1024 / 1024).toFixed(2) + "GB";
    return (bytes / 1024 / 1024 / 1024 / 1024).toFixed(2) + "TB";
}

exports.sizeStringToBytes = sizeStringToBytes;
exports.bytesToSizeString = bytesToSizeString;
