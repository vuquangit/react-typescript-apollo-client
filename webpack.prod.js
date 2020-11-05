/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const TerserPlugin = require('terser-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const CopyPlugin = require('copy-webpack-plugin')

process.env.APP_VERSION = Math.round(new Date().getTime() / 1000).toString()

module.exports = (env) => {
  return merge(common(env), {
    mode: 'production',
    // IMPORTANT: Configure server to disallow access to source maps from public!
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].bundle.js',
      chunkFilename: '[contenthash].bundle.js',
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          // cache: true,
          parallel: true,
          terserOptions: {
            compress: false,
            ecma: 5,
            mangle: true,
            keep_classnames: true,
            keep_fnames: true,
          },
          // sourceMap: true,
        }),
      ],
      splitChunks: {
        minSize: 30000,
        // maxSize: 50000,
        maxAsyncRequests: 15,
        maxInitialRequests: 15,
      },
    },
    plugins: [
      new CleanWebpackPlugin(),

      // new CopyPlugin({
      //   // patterns: [{ from: path.join(__dirname, 'assets'), to: 'assets' }],
      //   patterns: [
      //     { from: path.join(__dirname, 'assets') },
      //     { from: path.resolve(__dirname, 'public', 'service-worker.js'), },
      //   ],
      // }),

      // Generate an asset manifest file with the following content:
      // - "files" key: Mapping of all asset filenames to their corresponding
      //   output file so that tools can pick it up without having to parse
      //   `index.html`
      // - "entrypoints" key: Array of files which are included in `index.html`,
      //   can be used to reconstruct the HTML if necessary
      // new ManifestPlugin({
      // fileName: 'asset-manifest.json',
      // publicPath: '/build/',
      // generate: (seed, files, entrypoints) => {
      //   const manifestFiles = files.reduce((manifest, file) => {
      //     manifest[file.name] = file.path;
      //     return manifest;
      //   }, seed);
      //   const entrypointFiles = entrypoints.main.filter(
      //     fileName => !fileName.endsWith('.map')
      //   );

      //   return {
      //     files: manifestFiles,
      //     entrypoints: entrypointFiles,
      //   };
      // },
      // }),
    ],
  })
}
