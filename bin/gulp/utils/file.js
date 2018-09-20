const fs = require('fs');
const path = require('path');

const createFolderSync = function (file) {
    try {
        var sep = path.sep
        var folders = path.dirname(file).split(sep);
        var p = '';
        while (folders.length) {
            p += folders.shift() + sep;
            if (!fs.existsSync(p)) {
                fs.mkdirSync(p);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteFileSync = function (path) {
    try {
        fs.unlinkSync(path);
    } catch (error) {
    }
}

const deleteFolderSync = function (path) {
    try {
        var files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach(function (file, index) {
                var curPath = path + "/" + file;
                if (fs.statSync(curPath).isDirectory()) {
                    // recurse
                    deleteFolderSync(curPath);
                } else {
                    // delete file
                    deleteFileSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    } catch (error) {
        console.log(error);
    }
};

const createFileSync = function (file, content) {
    createFolderSync(file);
    fs.createWriteStream(file);
    fs.writeFileSync(file, content);
};

const existsSync = function (file) {
    return fs.existsSync(file);
};

module.exports = {
    createFileSync, createFolderSync, deleteFolderSync, existsSync, deleteFileSync
}