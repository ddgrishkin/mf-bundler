const path = require('path');
const paths = require('../paths');
const webpack = require('webpack');
const remove = require('../helpers/remove');

const getServerConfig = require('../webpack/server');
const getClientConfig = require('../webpack/client');

module.exports = async function build() {
  const basePath = process.cwd();
  const { name } = require(path.resolve(basePath, 'package.json'));
  const options = {
    mode: process.env.MODE ?? 'production',
    basePath,
    name,
  };

  try {
    console.log('Cleanup previous artifacts\n');
    remove(paths.dist(basePath));
  } catch(e) {}

  const serverConfig = getServerConfig(options);
  const clientConfig = getClientConfig(options);

  console.log('Start building a project\n');
  webpack([serverConfig, clientConfig], (err, stats) => {
    // TODO: handle errors
    if (err) console.log('Error: ', err);
    if (stats) {
      const info = stats.toJson();
      if (stats.hasErrors()) {
        console.error(info.errors);
        return;
      }

      if (stats.hasWarnings()) {
        console.warn(info.warnings);
      }

      console.log('Building is complete');
    }
  });
};
