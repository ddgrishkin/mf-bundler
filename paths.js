const path = require('path');

const public = (base) => path.resolve(base, './public');
const dist = (base) => path.resolve(base, './dist');
const src = (base) => path.resolve(base, './src');

module.exports = {
  public,
  dist,
  src,
}
