var webpack = require('webpack');
var path = require('path');
module.exports = {
  entry: './index.js',
  target: 'node',
  output: {
    path: path.join(__dirname, "build"),
    filename: 'index.js',
    library: "index",
    libraryTarget: "commonjs2"
  },
  node: {
    __filename: false,
    __dirname: false,
  },
}