var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    // nameOfOutputFile: './path/to/file.js'
    collapsePost: './src/js/collapsePost.js',
    datepicker: './src/js/datepicker.js'
  },
  output: {
    path: path.resolve(__dirname, 'server/static/js'),
    filename: '[name].js'
  },
  resolve: {
    modules: [
      'node_modules',
      // path.resolve(__dirname, 'lib'),
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: true
    })
  ]
};