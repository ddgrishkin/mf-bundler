const path = require('path');
const paths = require('../paths');
const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const getCommonConfig = require('./common');

module.exports = function (options) {
    const {basePath} = options;

    return merge(getCommonConfig({ ...options, isServer: true }), {
        entry: path.resolve(paths.src(basePath), 'server/index.tsx'),
        output: {
            filename: 'index.js',
            path: path.resolve(paths.dist(basePath), 'server'),
            publicPath: '/',
        },

        externals: [nodeExternals()],
    });
};
