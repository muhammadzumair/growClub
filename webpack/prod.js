import path from 'path'
import webpack from 'webpack'
import autoprefixer from 'autoprefixer'
import sassLintPlugin from 'sasslint-webpack-plugin'
import htmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import settings from './settings';

const ROOT = path.resolve(__dirname, '../');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  'process.env.GRAPHQL_SERVER': JSON.stringify(process.env.GRAPHQL_SERVER),
  __DEV__: false
};

const config = settings(ROOT);
config.template = path.join(ROOT, 'src/templates/index.prod.ejs');

export default {
  target: 'web',
  entry: {
    bundle: config.entry,
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
    publicPath: '/',
    path: config.buildPath,
    filename: 'js/bundle.[hash:8].js'
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new webpack.NoEmitOnErrorsPlugin(),
    new htmlWebpackPlugin({
      title: 'GrowClub',
      template: config.template
    }),
    new sassLintPlugin({
      configFile: path.join(ROOT, '.sass-lint.yml'),
      ignorePlugins: [
        'html-webpack-plugin',
        'extract-text-webpack-plugin'
      ],
      context: [
        config.stylesPath,
        path.join(ROOT, 'src/client/js')
      ],
      glob: '**/*.s?(a|c)ss',
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/[name].[hash:8].js',
    }),
    new ExtractTextPlugin(`css/style.[hash:8].css`)
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
                'react'
              ],
              plugins: [
                'transform-react-constant-elements',
                'transform-react-remove-prop-types',
                path.join(ROOT, 'scripts/babelRelayPlugin')
              ]
            }
          }
        ],
      },
      {
        enforce: 'pre',
        test: /(\.scss)$/,
        loader: 'import-glob-loader'
      },
      {
        test: /(\.css|\.scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { minimize: true } },
            { loader: 'postcss-loader', options: {
              plugins: () => [autoprefixer({browsers: ['last 6 versions']})]
            }},
            'sass-loader'
          ]
        })
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
            limit: config.maxInlinedAssetSize,
            name: 'images/img.[hash:8].[ext]'
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
          { loader: 'file-loader', options: { name: 'fonts/f.[hash:8].[ext]' } }
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.scss'],
    modules: [
      path.join(ROOT, 'node_modules'),
      path.join(ROOT, 'src'),
    ]
  },
};

