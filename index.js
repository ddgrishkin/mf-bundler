#!/usr/bin/env node
const build = require('./src/lib/build');

module.exports = function(args) {
  const [command] = args;
  switch (command) {
    case 'build':
      return build();
    case 'dev':
      console.log('dev!');
      return;
    default:
      console.error(`Command "${command}" was not found`);
  }
}
