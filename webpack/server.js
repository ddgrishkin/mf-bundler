const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const getCommonConfig = require('./common');

module.exports = function (options) {
    const {basePath} = options;

    return merge(getCommonConfig({ ...options, isServer: true }), {
        output: {
            filename: 'index.js',
            path: path.resolve(basePath, './dist'),
            publicPath: '/',
        },

        externals: [nodeExternals()],
    });
};
