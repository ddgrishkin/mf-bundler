const {stat, rm} = require('node:fs/promises')

module.exports = async function remove(path) {
    const statData = await stat(path);
    if (statData.isDirectory()) {
        return rm(path, {recursive: true});
    }

    if (statData.isFile) {
        return rm(path);
    }

    return Promise.reject('No file or directory provided by given path');
}
