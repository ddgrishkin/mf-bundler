const path = require('path');
const paths = require('../paths');
const getTypescriptRules = require('./rules/typescript');
const getStyleRules = require('./rules/style');

module.exports = function (options) {
  const { basePath, isServer, mode } = options;

  return {
    mode,
    target: isServer ? 'async-node' : 'web',
    module: {
      rules: [
        ...getTypescriptRules(),
        ...getStyleRules(options),
      ],
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.css'],
      modules: ['node_modules', paths.src(basePath)],
      alias: {
        '@/*': path.resolve(paths.src(basePath), '*'),
      },
    },
  }
}

