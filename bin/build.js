#!/usr/bin/env node
const fs = require("fs");
const exec = require('child_process').exec;
const packDir = __dirname + '/../';

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
    callExec("node node_modules/gulp/bin/gulp.js --gulpfile " + packDir + "./bin/gulp/gulpfile.js --cwd " + packDir + " build " + process.argv.slice(2).join(' '), cwd, function (stdout, error) {
        if (error) {
            console.log(stdout, error);
            console.log('');
            console.log('build fail.\n');
        } else {
            console.log(stdout);
            console.log('');
            console.log('build complete.\n');
        }
    });
}

fs.exists(packDir + "node_modules/gulp/bin/gulp.js", function (exists) {
    call(exists ? packDir : '');
});






