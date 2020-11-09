/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

// const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')

const paths = require('./paths')

module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development'
  const isEnvProduction = webpackEnv === 'production'

  console.log(
    'isEnvDevelopment:',
    isEnvDevelopment,
    '  isEnvProductionL:',
    isEnvProduction
  )

  return {
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
      paths.appIndexJs,
    ],

    // Customize the webpack build process
    plugins: [
      // Removes/cleans build folders and unused assets when rebuilding
      new CleanWebpackPlugin(),

      // Copies files from target to destination folder
      new CopyWebpackPlugin({
        patterns: [
          {
            from: paths.appPublic,
            globOptions: {
              ignore: [
                '*.DS_Store',
                '**/index.html',
                // '**/manifest.json',
              ],
            },
          },
        ],
      }),

      // Generates an HTML file from a template
      // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
      new HtmlWebpackPlugin({
        // inject: true,
        title: 'React Typescripts',
        template: paths.appPublic + '/index.html', // template file
        filename: 'index.html', // output file
      }),

      // Makes some environment variables available in index.html.
      // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
      // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
      // It will be an empty string unless you specify "homepage"
      // in `package.json`, in which case it will be the pathname of that URL.
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
        PUBLIC_URL: paths.publicUrlOrPath.slice(0, -1),
      }),

      // Moment.js is an extremely popular library that bundles large locale files
      // by default due to how webpack interprets its code. This is a practical
      // solution that requires the user to opt into importing specific locales.
      // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
      // You can remove this if you don't use Moment.js:
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
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
        {
          test: /\.(js, jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },

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
      modules: [paths.appSrc, paths.appBuild, 'node_modules'],
      extensions: ['.js', 'jsx', '.json', '.ts', '.tsx'],
      alias: {
        '/*': paths.appSrc,
      },
    },
  }
}
