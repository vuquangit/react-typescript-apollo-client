/* eslint-disable @typescript-eslint/no-var-requires */
process.env.NODE_ENV = 'development';

const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = (env) => {
  return merge(common(env), {
    mode: 'development',

    // Use eval-cheap-source-map for accurate line numbers, eval has best build performance
    devtool: 'eval-source-map',

    output: {
      pathinfo: true,
      path: path.resolve( __dirname, 'build' ),
      filename: '[name].bundle.js',
      publicPath: '/',
    },

    devServer: {
      historyApiFallback: true,
      port: 4000,
      compress: true,
      contentBase: path.join(__dirname, 'build'),
      inline: true,
      hot: true,
      open: true,
      // stats: {
      //   assets: true,
      //   children: false,
      //   chunks: false,
      //   hash: false,
      //   modules: false,
      //   publicPath: false,
      //   timings: true,
      //   version: false,
      //   warnings: true
      // }
    },

    plugins: [
      new CleanWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      // new webpack.optimize.LimitChunkCountPlugin({
      //   maxChunks: 1,
      // }),
      // new LiveReloadPlugin(),
    ],
    watch: true,
  })
}
