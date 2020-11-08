/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = require('./paths')

module.exports = {
  // context: resolve(__dirname, 'src'),

  // Where webpack looks to start building the bundle
  entry: [
    // activate HMR for React
    'react-hot-loader/patch',

    // bundle the client for webpack dev server
    // and connect to the provided endpoint
    'webpack-dev-server/client',

    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    'webpack/hot/only-dev-server',

    // the entry point of our app
    path.join(paths.src, '/index.tsx'),
  ],

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: '[name].bundle.js',

    // necessary for HMR to know where to load the hot update chunks
    publicPath: '/',
  },

  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        // {
        //   from: paths.public,
        //   to: 'assets',
        //   globOptions: {
        //     ignore: [
        //       '*.DS_Store',
        //       '**/favicon.ico',
        //       '**/index.html',
        //       '**/service-worker.js',
        //     ],
        //   },
        // },
        {
          from: paths.public + '/service-worker.js',
        },
      ],
    }),

    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      favicon: paths.public + '/favicon.ico',
      template: paths.public + '/index.html', // template file
      filename: 'index.html', // output file
    }),
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },

      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.(js, jsx)$/, exclude: /node_modules/, use: ['babel-loader'] },

      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1 },
          },
          // { loader: 'postcss-loader', options: { sourceMap: true } },
          // { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },

      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
    ],
  },

  resolve: {
    modules: [paths.src, paths.public, 'node_modules'],
    extensions: ['.js', 'jsx', '.json', '.ts', '.tsx'],
    alias: {
      '/*': paths.src,
    },
  },
}
