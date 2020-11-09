/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const common = require('./webpack.common.js')
const paths = require('./paths')

module.exports = merge(common('development'), {
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',

  output: {
    // The build folder.
    path: undefined,
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // There will be one main bundle, and one file per asynchronous chunk.
    // In development, it does not produce real files.
    filename: 'static/js/bundle.js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: 'static/js/[name].chunk.js',
  },

  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    inline: true,
    open: true,
    port: 4000,
    compress: true,
    contentBase: paths.appBuild,
    // watchContentBase: true,
    hot: true,
    publicPath: paths.publicUrlOrPath,
  },

  plugins: [
    // Only update what has changed on hot reload
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),

    // run TSC on a separate thread
    new ForkTsCheckerWebpackPlugin(),
  ],

  // watch: true,
})
