import { createReadStream, statSync, readdirSync } from "fs";

const pathRoot = '../shop/src';

function getFilePathsArray(dir, files = []) {
    const fileList = readdirSync(dir)

    for (const file of fileList) {
        const name = `${dir}/${file}`
        if (statSync(name).isDirectory()) {
            getFilePathsArray(name, files)
        } else {
            files.push(name)
        }
    }

    return files
}

const countFileLines = function(filePath, callback) {
    let i;
    let count = 0;

    return createReadStream(filePath)
        .on('error', e => callback(e))
        .on('data', chunk => {
            for (i=0; i < chunk.length; ++i) if (chunk[i] === 10) count++;
        })
        .on('end', () => callback(null, count));
};


const getTotalCount = function (directory) {
    const files = getFilePathsArray(directory);
    let totalCount = 0;

    files.forEach((file) => {
        countFileLines(file, (error, count) => {
            // console.log(count);
            // return count;
            totalCount += count;
        })
    })
    return totalCount;
}

const count = getTotalCount(pathRoot)
console.log(count);
