'use strict';

var webpack = require('webpack');
var HtmlPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var loaders = require('./webpack.config.loaders')();

loaders.push({
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: 'css-loader'
    })
});

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[hash].js',
        path: './dist'
    },
    devtool: 'source-map',
    module: {
        loaders: loaders
    },
    plugins: [new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
            drop_debugger: false
        }
    }), new ExtractTextPlugin('styles.css'), new HtmlPlugin({
        title: 'Loft School sample project',
        template: 'index.hbs'
    }), new CleanWebpackPlugin(['dist'])]
};
//# sourceMappingURL=webpack.config.js.map