const path = require('path');
const rules = require('./webpack.rules.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
    entry: path.resolve('./src/index.js'),
    output: {
        path: path.resolve('./dist/wechat/openDataContext'),
        filename: 'code.js',
        libraryTarget: 'umd',
    },
    externals: {
    },
    module: {
        rules,
    },
    plugins: [
        new UglifyJsPlugin()
    ]
};

module.exports = config;
