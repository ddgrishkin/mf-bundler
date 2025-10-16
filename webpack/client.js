const { merge } = require('webpack-merge');
const getCommonConfig = require('./common');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = function (options) {
    const { basePath } = options;

    return merge(getCommonConfig({ ...options, isServer: true }), {
        output: {
            filename: 'main.js',
            path: path.resolve(basePath, './dist/static'),
            publicPath: '/',
        },

        optimization: {
            splitChunks: {
                cacheGroups: {
                    react: {
                        reuseExistingChunk: true,
                        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                        name: 'vendors/react-vendor',
                        chunks: 'all',
                    },
                },
            },
        },

        plugins: [
            new MiniCssExtractPlugin(),
            new WebpackManifestPlugin({
                publicPath: '/',
            }),
        ],
    });
};
