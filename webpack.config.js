const path = require('path');
const webpack = require('webpack');

const outPath = path.join(__dirname, 'dist');

module.exports = {
  entry: './src/index.js',
  output: { path: outPath, filename: 'bundle.js'},
  devtool: "#source-map",
  module: {
    loaders: [{
      test: /.js?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }]
  }
}
