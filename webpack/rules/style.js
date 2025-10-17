const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * Get css loader options depends on target
 * @param {*} param0 
 * @returns 
 */
function getCssLoaderOptions({ isServer = false }) {
  const isProduction = process.env.MODE === 'production';
  const localIdentName = isProduction ? '[hash:base64:5]' : '[folder]__[local]__[hash:base64:5]';
  const loaderOptions = {
    modules: {
      localIdentName,
      namedExport: false,
      exportOnlyLocals: isServer,
      exportLocalsConvention: 'camel-case',
    },
  };

  return loaderOptions;
}

function getStyleRules({ isServer = false }) {
  const loaders = [];
  if (!isServer) {
    loaders.push(MiniCssExtractPlugin.loader);
  }

  loaders.push({
    loader: 'css-loader',
    options: getCssLoaderOptions({ isServer }),
  });

  return [
    {
      test: /.\module\.css$/i,
      use: loaders,
    },
  ]
}

module.exports = getStyleRules;
