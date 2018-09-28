const iconv = require('iconv-lite');
const exec = require('child_process').exec;

function execute(cmd, options, callback, encode = 'utf-8') {
    exec(cmd, Object.assign(options || {}, { encoding: 'buffer' }), function (error, stdout, stderr) {
        callback && callback(error, iconv.decode(stderr, encode), iconv.decode(stdout, encode));
    });
}

module.exports = {
    execute
}