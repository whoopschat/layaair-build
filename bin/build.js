#!/usr/bin/env node
const chalk = require('chalk');
const path = require('path');
const fs = require("fs");
const exec = require('./gulp/lib/exectools');
const libDir = path.join(__dirname, '/../');

const call = (cwd = '') => {
    console.log('start build...\n');
    process.argv.push('--bincwd', process.cwd());
    let gulpfile = path.join(libDir, './bin/gulp/gulpfile.js');
    let gulpcwd = path.join(libDir);
    let cmd = "node node_modules/gulp/bin/gulp.js --gulpfile " + gulpfile + " --cwd " + gulpcwd + " build " + process.argv.slice(2).join(' ');
    exec.execute(cmd, { cwd }, function (_error, _stdout, stderr) {
        if (stderr.indexOf('build error') >= 0) {
            console.log(chalk.red(stderr));
            console.log('');
        } else {
            console.log(stderr);
            console.log('');
        }
    }, 'utf-8');
}

fs.exists(path.join(libDir, "node_modules/gulp/bin/gulp.js"), function (exists) {
    call(exists ? libDir : '');
});






