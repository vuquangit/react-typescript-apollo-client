/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const path = require('path')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const paths = require('./paths')
const common = require('./webpack.common.js')
const isEnvProductionProfile = process.argv.includes('--profile')

process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'
// process.env.APP_VERSION = Math.round(new Date().getTime() / 1000).toString();

module.exports = merge(common('production'), {
  mode: 'production',

  // Where webpack looks to start building the bundle
  entry: paths.appIndexJs,

  output: {
    // The build folder.
    path: paths.appBuild,
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: false,

    // There will be one main bundle, and one file per asynchronous chunk.
    // In development, it does not produce real files.
    filename: 'static/js/[name].[contenthash:8].js',

    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',

    // webpack uses `publicPath` to determine where the app is being served from.
    // It requires a trailing slash, or the file assets will get an incorrect path.
    // We inferred the "public path" (such as / or /my-project) from homepage.
    publicPath: paths.publicUrlOrPath,

    // // Point sourcemap entries to original disk location (format as URL on Windows)
    // devtoolModuleFilenameTemplate: (info) =>
    //   path
    //     .relative(paths.appSrc, info.absoluteResourcePath)
    //     .replace(/\\/g, '/'),

    // // this defaults to 'window', but by setting it to 'this' then
    // // module chunks which are built will work in web workers as well.
    // globalObject: 'this',
  },

  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // // Extracts CSS into separate files
    // // Note: style-loader is for development, MiniCssExtractPlugin is for production
    // new MiniCssExtractPlugin({
    //   filename: 'styles/[name].[contenthash].css',
    //   chunkFilename: '[id].css',
    // }),

    // // Generate an asset manifest file with the following content:
    // // - "files" key: Mapping of all asset filenames to their corresponding
    // //   output file so that tools can pick it up without having to parse
    // //   `index.html`
    // // - "entrypoints" key: Array of files which are included in `index.html`,
    // //   can be used to reconstruct the HTML if necessary
    // new ManifestPlugin({
    //   fileName: 'asset-manifest.json',
    //   publicPath: paths.publicUrlOrPath,
    //   generate: (seed, files, entrypoints) => {
    //     const manifestFiles = files.reduce((manifest, file) => {
    //       manifest[file.name] = file.path
    //       return manifest
    //     }, seed)
    //     const entrypointFiles = entrypoints.main.filter(
    //       (fileName) => !fileName.endsWith('.map')
    //     )

    //     return {
    //       files: manifestFiles,
    //       entrypoints: entrypointFiles,
    //     }
    //   },
    // }),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.appPublic,
          globOptions: {
            ignore: ['*.DS_Store', '**/index.html', '**/service-worker.js'],
          },
        },
      ],
    }),

    // // Generate a service worker script that will precache, and keep up to date,
    // // the HTML & assets that are part of the webpack build.
    // // workbox-webpack-plugin: "4.3.1"
    // new WorkboxWebpackPlugin.GenerateSW({
    //   clientsClaim: true,
    //   exclude: [/\.map$/, /asset-manifest\.json$/],
    //   importWorkboxFrom: 'cdn',
    //   navigateFallback: paths.publicUrlOrPath + 'index.html',
    //   navigateFallbackBlacklist: [
    //     // Exclude URLs starting with /_, as they're likely an API call
    //     new RegExp('^/_'),
    //     // Exclude any URLs whose last part seems to be a file extension
    //     // as they're likely a resource and not a SPA route.
    //     // URLs containing a "?" character won't be blacklisted as they're likely
    //     // a route with query params (e.g. auth callbacks).
    //     new RegExp('/[^/?]+\\.[^/]+$'),
    //   ],
    // }),
  ],

  // module: {
  //   rules: [
  //     {
  //       test: /\.(scss|css)$/,
  //       use: [
  //         MiniCssExtractPlugin.loader,
  //         {
  //           loader: 'css-loader',
  //           options: {
  //             importLoaders: 2,
  //             sourceMap: false,
  //           },
  //         },
  //         'postcss-loader',
  //         'sass-loader',
  //       ],
  //     },
  //   ],
  // },

  // optimization: {
  //   minimize: true,
  //   minimizer: [
  //     new OptimizeCssAssetsPlugin(),
  //     new JsonMinimizerPlugin(),
  //     // This is only used in production mode
  //     new TerserPlugin({
  //       terserOptions: {
  //         parse: {
  //           // We want terser to parse ecma 8 code. However, we don't want it
  //           // to apply any minification steps that turns valid ecma 5 code
  //           // into invalid ecma 5 code. This is why the 'compress' and 'output'
  //           // sections only apply transformations that are ecma 5 safe
  //           // https://github.com/facebook/create-react-app/pull/4234
  //           ecma: 8,
  //         },
  //         compress: {
  //           ecma: 5,
  //           warnings: false,
  //           // Disabled because of an issue with Uglify breaking seemingly valid code:
  //           // https://github.com/facebook/create-react-app/issues/2376
  //           // Pending further investigation:
  //           // https://github.com/mishoo/UglifyJS2/issues/2011
  //           comparisons: false,
  //           // Disabled because of an issue with Terser breaking valid code:
  //           // https://github.com/facebook/create-react-app/issues/5250
  //           // Pending further investigation:
  //           // https://github.com/terser-js/terser/issues/120
  //           inline: 2,
  //         },
  //         mangle: {
  //           safari10: true,
  //         },
  //         // Added for profiling in devtools
  //         keep_classnames: isEnvProductionProfile,
  //         keep_fnames: isEnvProductionProfile,
  //         output: {
  //           ecma: 5,
  //           comments: false,
  //           // Turned on because emoji and regex is not minified properly using default
  //           // https://github.com/facebook/create-react-app/issues/2488
  //           ascii_only: true,
  //         },
  //       },
  //       // sourceMap: shouldUseSourceMap,
  //     }),
  //   ],

  //   // Automatically split vendor and commons
  //   splitChunks: {
  //     chunks: 'all',
  //     name: false,
  //   },

  //   // Keep the runtime chunk separated to enable long term caching
  //   runtimeChunk: {
  //     name: (entrypoint) => `runtime-${entrypoint.name}`,
  //   },
  // },

  // performance: {
  //   hints: false,
  //   maxEntrypointSize: 512000,
  //   maxAssetSize: 512000,
  // },
})
