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
            path: paths.dist(basePath),
            publicPath: '/',
        },

        externals: [nodeExternals()],
    });
};
