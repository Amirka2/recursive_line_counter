import { createReadStream, statSync, readdirSync } from "fs";

const pathRoot = '../shop/src';

function getFiles(dir, files = []) {
    const fileList = readdirSync(dir)

    for (const file of fileList) {
        const name = `${dir}/${file}`
        if (statSync(name).isDirectory()) {
            getFiles(name, files)
        } else {
            files.push(name)
        }
    }

    return files
}

