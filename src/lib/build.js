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

  webpack([serverConfig, clientConfig], (err, stats) => {
    console.log(err, stats.hasErrors());
    console.log('Build completed successfully.');
  });
};
