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
    // Uncomment when tun on the postcss-loader
    // importLoaders: 1,
    namedExport: false,
    exportOnlyLocals: isServer,
    exportLocalsConvention: 'camel-case',
    modules: {
      localIdentName,
    },
  };

  return loaderOptions;
}

function getStyleRules({ isServer = false }) {
  return [
    {
      test: /.\module\.css$/i,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: getCssLoaderOptions({ isServer }),
        },
        // Uncomment when decide to use loader
        // 'postcss-loader'
      ],
    },
  ]
}

module.exports = getStyleRules;
