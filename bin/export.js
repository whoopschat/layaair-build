#!/usr/bin/env node
const fs = require("fs");
const exec = require('child_process').exec;
const packDir = __dirname + '/../';

const callExec = function (cmd, dir, success) {
    exec(cmd, { cwd: dir }, function (error, stdout, stderr) {
        if (error != null && stderr != null) {
            console.log(stderr, error);
        } else {
            console.log(stdout);
            success && success();
        }
    });
};

const call = (cwd = '') => {
    console.log('start export...\n');
    process.argv.push('--bincwd', process.cwd());
    callExec("node node_modules/gulp/bin/gulp.js --gulpfile ./bin/gulp/gulpfile.js --cwd " + packDir + " build " + process.argv.slice(2).join(' '), cwd, function () {
        console.log('export complete.\n');
    });
}

fs.exists(packDir + "node_modules/gulp/bin/gulp.js", function (exists) {
    call(exists ? packDir : '');
});






