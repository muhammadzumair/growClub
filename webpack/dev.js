'use strict';
import path from 'path'
import webpack from 'webpack'
import autoprefixer from 'autoprefixer'
import sassLintPlugin from 'sasslint-webpack-plugin'
import htmlWebpackPlugin from 'html-webpack-plugin'
import settings from './settings';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  'process.env.GRAPHQL_SERVER': JSON.stringify('http://growclub-stagee-graphql.scalabs.it/'),
  __DEV__: true
};

const ROOT = path.resolve(__dirname, '../');

const config = settings(ROOT);

export default {
  target: 'web',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    bundle: [
      'webpack-hot-middleware/client?reload=true',
      config.entry
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-relay',
      'react-router-relay',
      'react-big-calendar'
    ]
  },
  output: {
    publicPath: `http://${config.host}:${config.port}/`, // Use absolute paths to avoid the way that URLs are resolved by Chrome when they're parsed from a dynamically loaded CSS blob. Note: Only necessary in Dev.
    path: config.buildPath,
    filename: config.outputName
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new htmlWebpackPlugin({
      title: 'GrowClub',
      template: config.template
    }),
    new sassLintPlugin({
      configFile: path.join(ROOT, '.sass-lint.yml'),
      ignorePlugins: ['html-webpack-plugin'],
      context: [
        config.stylesPath,
        path.join(ROOT, 'src/client/js')
      ],
      glob: '**/*.s?(a|c)ss',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/[name].[hash:8].js',
      minChunks: Infinity
    })
  ],
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: [
                'es2015',
                'stage-0',
                'react',
                'react-hmre'
              ],
              plugins: [
                path.join(ROOT, 'scripts/babelRelayPlugin')
              ]
            }
          }
        ]
      },
      {
        enforce: 'pre',
        test: /(\.scss)$/,
        loader: 'import-glob-loader'
      },
      {
        test: /(\.css|\.scss)$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: {
              plugins: () => [autoprefixer({browsers: ['last 6 versions']})]
          }},
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'less-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          { loader: 'url-loader', options: {
            limit: config.maxInlineAssetSize,
            name: '[path][name].[ext]'
          }}
        ]
      },
      {
        test: /\.ico$/,
        use: [
          { loader: 'file-loader', options: { name: '[name].[ext]' } }
        ]
      },
      {
        test: /\.(ttf|eot|otf|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          { loader: 'file-loader', options: { name: '[path][name].[ext]' } }
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.scss'],
    modules: [
      path.join(ROOT, 'node_modules'),
      path.join(ROOT, 'src')
    ]
  },
};
