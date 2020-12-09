/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const common = require('./webpack.common.js')
const paths = require('./paths')

process.env.NODE_ENV = 'development'

module.exports = merge(common('development'), {
  // Set the mode to development or production
  mode: 'development',

  entry: [
    paths.appIndexJs,

    // activate HMR for React
    require.resolve('react-hot-loader/patch'),

    // bundle the client for webpack dev server
    // and connect to the provided endpoint
    require.resolve('webpack-dev-server/client'),

    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    require.resolve('webpack/hot/only-dev-server'),
  ],

  output: {
    // The build folder.
    path: paths.appBuild,
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
    port: 3000,
    compress: true,
    contentBase: paths.appBuild,
    // watchContentBase: true,
    hot: true,
    publicPath: paths.publicUrlOrPath,
  },

  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Only update what has changed on hot reload
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),

    // run TSC on a separate thread
    new ForkTsCheckerWebpackPlugin(),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.appPublic,
          globOptions: {
            ignore: ['*.DS_Store', '**/index.html'],
          },
        },
      ],
    }),
  ],
})
