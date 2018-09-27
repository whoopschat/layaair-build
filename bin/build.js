#!/usr/bin/env node
const chalk = require('chalk');
const path = require('path');
const fs = require("fs");
const exec = require('child_process').exec;
const packDir = path.join(__dirname, '/../');

const callExec = function (cmd, dir, success) {
    exec(cmd, { cwd: dir }, function (error, stdout, stderr) {
        if (error != null && stderr != null) {
            success && success(stderr, error);
        } else {
            success && success(stdout);
        }
    });
};

const call = (cwd = '') => {
    console.log('start build...\n');
    process.argv.push('--bincwd', process.cwd());
    let gulpfile = path.join(packDir, './bin/gulp/gulpfile.js');
    let gulpcwd = path.join(packDir);
    callExec("node node_modules/gulp/bin/gulp.js --gulpfile " + gulpfile + " --cwd " + gulpcwd + " build " + process.argv.slice(2).join(' '), cwd, function (stdout, error) {
        if (stdout.indexOf('Error:') >= 0) {
            console.log(chalk.red(stdout));
            console.log('');
        } else {
            console.log(chalk.cyan(stdout));
            console.log('');
        }
    });
}

fs.exists(path.join(packDir, "node_modules/gulp/bin/gulp.js"), function (exists) {
    call(exists ? packDir : '');
});






