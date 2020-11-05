/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

// const dirNode = 'node_modules'
// const dirApp = path.join(__dirname, 'src')
// const dirStyles = path.join(__dirname, 'styles')
// const dirAssets = path.join(__dirname, 'assets')

module.exports = (env) => {
  // Is the current build a development build
  const IS_DEV = !!env.dev

  return {
    entry: {
      main: path.resolve(__dirname, 'src/index.tsx'),
    },
    module: {
      rules: [
        {
          test: /\.(tsx|ts)$/,
          exclude: [path.resolve(__dirname, 'node_modules')],
          use: 'ts-loader',
        },
        {
          test: /\.(js|jsx)$/,
          exclude: [path.resolve(__dirname, 'node_modules')],
          use: [
            // 'eslint-loader',
            'babel-loader',
          ],
        },

        // STYLES
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: IS_DEV,
              },
            },
          ],
        },

        // CSS / SASS
        {
          test: /\.scss/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: IS_DEV,
              },
            },
            // {
            //   loader: 'sass-loader',
            //   options: {
            //     sourceMap: IS_DEV,
            //     sassOptions: {
            //       includePaths: [dirAssets],
            //     },
            //   },
            // },
          ],
        },

        // IMAGES
        {
          test: /\.(png|jpe?g|gif|ico)$/i,
          use: {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader'],
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
        },
    
      ],
    },
    plugins: [
      new Webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
          process.env.NODE_ENV || 'production'
        ),
        'process.env.APP_VERSION': JSON.stringify(
          process.env.APP_VERSION || 'dev'
        ),
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
        filename: 'index.html',
      }),

      new CopyPlugin({
        // patterns: [{ from: path.join(__dirname, 'assets'), to: 'assets' }],
        patterns: [
          { from: path.join(__dirname, 'assets') },
          // { from: path.resolve(__dirname, 'public', 'service-worker.js') },
          // { from: path.resolve(__dirname, 'public', 'favicon.ico') },
          // { from: path.resolve(__dirname, 'public', 'logo192.png') },
        ],
      }),
    ],
    resolve: {
      modules: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'public'),
        'node_modules',
      ],
      extensions: ['.js', '.json', '.ts', '.tsx'],
    },
  }
}
