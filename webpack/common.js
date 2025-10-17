const path = require('path');
const paths = require('../paths');
const getTypescriptRules = require('./rules/typescript');
const getStyleRules = require('./rules/style');

module.exports = function (options) {
  const { basePath, isServer } = options;

  return {
    mode: process.env.MODE ?? 'production',
    target: isServer ? 'async-node' : 'web',
    module: {
      rules: [
        ...getTypescriptRules(),
        ...getStyleRules({ isServer }),
      ],
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.css'],
      modules: [
        'node_modules',
        paths.src(basePath),
        path.resolve(__dirname, '../node_modules'),
      ],
      alias: {
        '@/*': path.resolve(paths.src(basePath), '*'),
      },
    },
  }
}

