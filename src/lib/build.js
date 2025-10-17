const path = require('path');
const webpack = require('webpack');

const getServerConfig = require('../../webpack/server');
const getClientConfig = require('../../webpack/client');

module.exports = function build() {
  console.log('Start building a project');
  
  const basePath = process.cwd();
  const {name} = require(path.resolve(basePath, 'package.json'));
  const options = {
    basePath,
    name,
  };

  const serverConfig = getServerConfig(options);
  const clientConfig = getClientConfig(options);

  // webpack([serverConfig, clientConfig], (err, stats) => {
  //   console.log(err, stats.hasErrors(), stats);
  //   console.log('Build completed successfully.');
  // });

  webpack([serverConfig, clientConfig], (err, stats) => {
    console.log('Error: ', err);
    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }
  });
};
