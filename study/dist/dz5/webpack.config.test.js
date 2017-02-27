'use strict';

var loaders = require('./webpack.config.loaders')();

loaders.push({
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader']
});

module.exports = {
    devtool: 'inline-source-map',
    module: {
        loaders: loaders
    }
};
//# sourceMappingURL=webpack.config.test.js.map