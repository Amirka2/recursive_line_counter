import { createReadStream, statSync, readdirSync } from "fs";

const pathRoot = '../[PROJECT_NAME]/src';

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

const countFileLines = function(filePath) {
    let i;
    let count = 0;

    return new Promise((resolve, reject) => {
        createReadStream(filePath)
            .on('error', e => reject(e))
            .on('data', chunk => {
                for (i=0; i < chunk.length; ++i) if (chunk[i] === 10) count++;
            })
            .on('end', () => resolve(count));
    })
};


const getTotalCount = async function (directory) {
    const files = getFilePathsArray(directory);
    let totalCount = 0;

    return Promise.all(files.map(async (file) => {
        const x = await countFileLines(file);

        totalCount += x;

        return x;
    }))
        .then(() => {
            return totalCount;
    })
}

getTotalCount(pathRoot)
    .then((res, rej) => {
        console.log(res)
    })
