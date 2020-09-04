import { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import UglifyjsWebpackPlugin from 'uglifyjs-webpack-plugin'
import optimizeCssPlugin from 'optimize-css-assets-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import * as paths from './paths.config'
import baseConfig from './webpack.config.base'

process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const isAnalyzer = process.argv.includes('--analyzer')

const prodConfig: Configuration = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  entry: {
    main: './src/entries/index.tsx',
  },
  output: {
    path: paths.BUILD_DIR,
    filename: 'scripts/[name].js',
    chunkFilename: 'scripts/[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'cache-loader',
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
              babelrc: false,
              plugins: ['@babel/plugin-syntax-dynamic-import'],
            },
          },
        ],
        include: paths.SRC_DIR,
      },
      {
        test: /\.(css|less)$/,
        exclude: [/node_modules\//],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            loader: 'cache-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              modules: {
                localIdentName: '[hash:base64:5]',
              },
              importLoaders: 2,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: false,
              lessOptions: {
                // javascriptEnabled: true,
                paths: [paths.STYLES_DIR],
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')],
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[name].[hash:8].[ext]',
          outputPath: 'images/',
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[hash].[ext]',
          outputPath: 'fonts/',
        },
      },
      {
        test: /\.(avi|mp3|mp4|mpg|ogg|wav|wmv)$/,
        loader: 'file-loader',
        options: {
          name: '[hash].[ext]',
          outputPath: 'media/',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/entries/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
      hash: true,
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*'],
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css'
      // filename: 'styles/[name].[contenthash:8].css'
    }),
    isAnalyzer ? new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8888,
      reportFilename: 'report.html',
      defaultSizes: 'parsed',
      openAnalyzer: true,
      generateStatsFile: false,
      statsFilename: 'stats.json',
      statsOptions: null,
      logLevel: 'info'
    }) : undefined
  ].filter(Boolean) as Configuration["plugins"],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@': paths.SRC_DIR,
    },
  },
  optimization: {
    runtimeChunk: {
      name: 'mainfest'
    },
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new UglifyjsWebpackPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new optimizeCssPlugin()
    ]
  }
}

export default merge(baseConfig, prodConfig)
