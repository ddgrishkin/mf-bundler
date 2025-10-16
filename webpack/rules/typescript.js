function getTypescriptRules() {
  return [
    {
      test: /\.tsx?$/,
      use: {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
      exclude: /node_modules/,
    },
  ];
}

module.exports = getTypescriptRules;
