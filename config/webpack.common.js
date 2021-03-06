/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const paths = require('./paths')
const webpack = require('webpack')
const resolve = require('resolve')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const getClientEnvironment = require('./env')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin')
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin')
const typescriptFormatter = require('react-dev-utils/typescriptFormatter')

// process.traceDeprecation = true

// Source maps are resource heavy and can cause out of memory issue for large source files.
// const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'
const shouldUseSourceMap = false

module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development'
  const isEnvProduction = webpackEnv === 'production'

  // We will provide `paths.publicUrlOrPath` to our app
  // as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
  // Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
  // Get environment variables to inject into our app.
  const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1))

  console.log(
    'isEnvDevelopment:',
    isEnvDevelopment,
    '  isEnvProduction:',
    isEnvProduction
  )

  return {
    // Stop compilation early in production
    bail: isEnvProduction,

    devtool: isEnvProduction
      ? shouldUseSourceMap
        ? 'source-map'
        : false
      : isEnvDevelopment && 'cheap-module-source-map',

    // Customize the webpack build process
    plugins: [
      // // Removes/cleans build folders and unused assets when rebuilding
      // new CleanWebpackPlugin(),

      // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.appHtml,
            title: 'React Typescripts',
          },
          isEnvProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined
        )
      ),

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
      // You can remove this if you don't use Moment.js:
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

      // Makes some environment variables available to the JS code, for example:
      // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
      // It is absolutely essential that NODE_ENV is set to production
      // during a production build.
      // Otherwise React will be compiled in the very slow development mode.
      // new webpack.DefinePlugin({
      //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      //   'process.env.APP_VERSION': JSON.stringify(process.env.APP_VERSION || 'dev'),
      // }),
      new webpack.DefinePlugin(env.stringified),

      // This gives some necessary context to module not found errors, such as
      // the requesting resource.
      new ModuleNotFoundPlugin(paths.appPath),

      new ForkTsCheckerWebpackPlugin({
        typescript: resolve.sync('typescript', {
          basedir: paths.appNodeModules,
        }),
        async: isEnvDevelopment,
        useTypescriptIncrementalApi: true,
        checkSyntacticErrors: true,
        resolveModuleNameModule: process.versions.pnp
          ? `${__dirname}/pnpTs.js`
          : undefined,
        resolveTypeReferenceDirectiveModule: process.versions.pnp
          ? `${__dirname}/pnpTs.js`
          : undefined,
        tsconfig: paths.appTsConfig,
        reportFiles: [
          '**',
          '!**/__tests__/**',
          '!**/?(*.)(spec|test).*',
          '!**/src/setupProxy.*',
          '!**/src/setupTests.*',
        ],
        silent: true,
        // The formatter is invoked directly in WebpackDevServerUtils during development
        formatter: isEnvProduction ? typescriptFormatter : undefined,
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
              options: {
                sourceMap: isEnvProduction && shouldUseSourceMap,
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: isEnvProduction && shouldUseSourceMap },
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: isEnvProduction && shouldUseSourceMap },
            },
          ],
        },

        // Images: Copy image files to build folder
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|bmp)$/i,
          loader: require.resolve('file-loader'),
          options: {
            name: 'assets/images/[name].[ext]',
            // name(resourcePath, resourceQuery) {
            //   if (process.env.NODE_ENV === 'development') {
            //     return 'assets/images/[name].[ext]';
            //   }
            //   return 'assets/images/[name].[hash:8].[ext]';
            // },
          },
        },

        // Fonts and SVGs: Inline files
        { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },

        // graphql loader
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
        },
      ],
    },

    resolve: {
      modules: [paths.appSrc, paths.appNodeModules],
      extensions: ['.js', 'jsx', '.ts', '.tsx'],
      alias: {
        '@': paths.appSrc,
      },
      plugins: [
        new TsconfigPathsPlugin({
          configFile: paths.appTsConfig,
          // extensions: ['.ts', '.tsx', '.js'],
          // logLevel: 'INFO',
          // baseUrl: paths.appPath,
          // mainFields: ['browser', 'main'],
        }),
      ],
    },
  }
}
