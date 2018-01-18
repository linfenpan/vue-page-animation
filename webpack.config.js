'use strict';
const path = require('path');

module.exports = {
  entry: {
    lib: ['vue', 'vue-router'],
    page: './page/index',
    main: './src/vue-page-animation'
  },

  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
  },

  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': path.resolve('./'),
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['css-loader'],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        options: {
          loaders: {
            css: ['css-loader'],
          },
        },
      }
    ],
  },
};
