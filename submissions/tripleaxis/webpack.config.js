var path = require('path');
var webpack = require('webpack');

module.exports = {

    entry: './src/app.js',
    //devtool: 'eval',
    devtool: 'source-map',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        }]
    }

};
