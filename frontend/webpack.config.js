var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  entry: [ 'babel-polyfill', './src/app.jsx' ],
  output: {
    path: '../static/',
    filename: 'bundled.js',
    sourceMapFilename: 'bundled.map',
  },
  devtool: '#source-map',
  module: {
    resolve: {
      extensions: [ '', 'js', 'jsx' ],
    },
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [ 'es2015', 'react' ],
        },
      },
    ],
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
  ],
};
