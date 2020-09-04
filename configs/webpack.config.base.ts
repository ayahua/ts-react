import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
// import { CleanWebpackPlugin } from 'clean-webpack-plugin'
// import MiniCssExtractPlugin from 'mini-css-extract-plugin'
// import UglifyjsWebpackPlugin from 'uglifyjs-webpack-plugin'
// import optimizeCssPlugin from 'optimize-css-assets-webpack-plugin'
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import * as paths from './paths.config'

// const isDev = process.argv.includes('--dev')

const baseConfig: webpack.Configuration = {
  // mode: isDev ? 'development' : 'production',
  // devtool: isDev ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
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
          // {
          //   loader: 'ts-loader',
          //   options: {
          //     compilerOptions: {
          //       module: 'esNext',
          //       sourceMap: isDev,
          //     },
          //   }
          // },
        ],
        include: paths.SRC_DIR,
      },
      // {
      //   test: /\.(css|less)$/,
      //   exclude: [/node_modules\//],
      //   use: [
      //     isDev ? 'style-loader' : 
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //       options: {
      //         publicPath: '../'
      //       }
      //     },
      //     {
      //       loader: 'cache-loader',
      //     },
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         sourceMap: !!isDev,
      //         modules: {
      //           localIdentName: isDev ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
      //         },
      //         importLoaders: 2,
      //       },
      //     },
      //     {
      //       loader: 'less-loader',
      //       options: {
      //         sourceMap: !!isDev,
      //         lessOptions: {
      //           // javascriptEnabled: true,
      //           paths: [paths.STYLES_DIR],
      //         },
      //       },
      //     },
      //     {
      //       loader: 'postcss-loader',
      //       options: {
      //         plugins: [require('autoprefixer')],
      //       },
      //     },
      //   ],
      // },
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
    // new CleanWebpackPlugin({
    //   cleanOnceBeforeBuildPatterns: ['**/*'],
    // }),
    // new MiniCssExtractPlugin({
    //   filename: 'styles/[name].css'
    //   // filename: 'styles/[name].[contenthash:8].css'
    // }),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'server',
    //   analyzerHost: '127.0.0.1',
    //   analyzerPort: 8888,
    //   reportFilename: 'report.html',
    //   defaultSizes: 'parsed',
    //   openAnalyzer: true,
    //   generateStatsFile: false,
    //   statsFilename: 'stats.json',
    //   statsOptions: null,
    //   logLevel: 'info'
    // })
  ],
  // devServer: {
  //   port: 6060,
  //   host: 'localhost',
  //   contentBase: paths.BUILD_DIR,
  //   open: true,
  //   historyApiFallback: true,
  // },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@': paths.SRC_DIR,
    },
  },
  // optimization: {
  //   runtimeChunk: {
  //     name: 'mainfest'
  //   },
  //   splitChunks: {
  //     cacheGroups: {
  //       default: false,
  //       commons: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendor',
  //         chunks: 'all'
  //       }
  //     }
  //   },
  //   minimizer: [
  //     new UglifyjsWebpackPlugin({
  //       cache: true,
  //       parallel: true,
  //       sourceMap: true
  //     }),
  //     new optimizeCssPlugin()
  //   ]
  // }
}

export default baseConfig
