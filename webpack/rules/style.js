const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * 
 * @param {*} param0 
 * @returns 
 */
function getGlobalStyleRule({ isServer = false }) {
  if (isServer) {
    return {
      test: /(?<!\.module)\.css/i,
      use: undefined,
    };
  }

  return {
    test: /(?<!\.module)\.css/i,
    type: 'asset/resource',
    generator: {
      filename: 'css/[contenthash][ext]',
    },
  };
}

/**
 * 
 * @param {*} param0 
 * @returns 
 */
function getModuleStyleRule({ isServer = false, mode }) {
  const isProduction = mode === 'production';
  const localIdentName = isProduction
    ? '[hash:base64:5]'
    : '[folder]__[local]__[hash:base64:5]';

  const loaders = [
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName,
          namedExport: false,
          exportOnlyLocals: isServer,
          exportLocalsConvention: 'camel-case',
        },
      },
    }
  ];

  if (!isServer) {
    loaders.unshift(MiniCssExtractPlugin.loader);
  }

  return {
    test: /.\module\.css$/i,
    use: loaders,
  };
}

/**
 * 
 * @param {*} options 
 * @returns 
 */
function getStyleRules(options) {
  return [
    getGlobalStyleRule(options),
    getModuleStyleRule(options),
  ];
}

module.exports = getStyleRules;
