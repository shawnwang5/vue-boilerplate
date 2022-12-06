const path = require('path')
const plugins = require('./plugins.config.js')
const { projectPath, isServe, isProduction, packageJSON } = require('./consts')
const os = require('os')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  devtool: 'eval-source-map',
  context: path.resolve(projectPath),
  mode: process.env.NODE_ENV,
  entry: {
    app: [path.resolve(projectPath, 'src/main.ts')]
  },
  output: {
    filename: 'js/[name][hash].js',
    chunkFilename: 'js/[name][hash].js',
    path: path.join(projectPath, 'dist'),
    publicPath: process.env.baseUrl
  },
  resolve: {
    alias: {
      '@': path.resolve(projectPath, 'src')
    },
    extensions: ['.ts', '.js', '.vue'],
    mainFiles: ['index'],
    modules: [
      path.resolve(projectPath, 'src'),
      path.resolve(projectPath, 'node_modules')
    ]
  },
  performance: {
    hints: false
  },
  stats: (() => {
    if (isServe) {
      return 'errors-warnings'
    }
    return {
      assets: true,
      assetsSort: '!size',
      cached: true,
      builtAt: true,
      cachedAssets: true,
      children: true,
      chunksSort: '!size',
      chunkGroups: true,
      chunkModules: true,
      chunkOrigins: true,
      chunks: true,
      colors: true,
      depth: true,
      entrypoints: true,
      env: true,
      errorDetails: true,
      errors: true
    }
  })(),
  optimization: {
    runtimeChunk: 'single',
    minimizer: [
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }]
        },
        canPrint: true
      }),
      new TerserPlugin({
        test: /\.js$/i,
        parallel: os.cpus().length,
        extractComments: false,
        terserOptions: {
          ecma: 5,
          warnings: false,
          parse: {},
          compress: {
            drop_console: true,
            keep_classnames: false,
            keep_fnames: false,
          },
          mangle: true,
          output: {
            beautify: false,
            comments: false,
            // 只用单引号
            quote_style: '1',
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      maxSize: 244 * 1024,
      minSize: 200 * 1024,
      minChunks: 1,
      automaticNameDelimiter: '.',
      name: true
    }
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'img/[name].[hash].[ext]' }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'font/[name].[hash].[ext]' }
          }
        ]
      },
      { test: /\.vue$/, use: ['vue-loader'] },
      {
        test: /\.s?css$/,
        use: [
          isProduction
            ? {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../'
                }
              }
            : 'vue-style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: { appendTsSuffixTo: [/\.vue$/] },
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: resourcePath => {
          const webpackConfig = packageJSON.webpackConfig || {}
          const transplieRegArray = [...webpackConfig.transpileModules]
          if (/\Wnode_modules\W/.test(resourcePath)) {
            for (let i = 0, len = transplieRegArray.length; i < len; i++) {
              const transplieItem = transplieRegArray[i]
              if (typeof transplieItem === 'string') {
                return !resourcePath.includes(transplieItem)
              } else if (typeof transplieItem === 'object') {
                return !transplieItem.test(resourcePath)
              }
            }
            return true
          }
          return false
        },
        use: ['babel-loader']
      }
    ]
  },
  devServer: {
    watchContentBase: true,
    useLocalIp: false,
    open: false,
    clientLogLevel: 'warning',
    openPage: 'index.html',
    host: '0.0.0.0',
    compress: true,
    overlay: true,
    contentBase: path.resolve(projectPath, 'public'),
    disableHostCheck: true,
    port: process.env.port,
    hot: true,
    hotOnly: true,
    inline: true,
    proxy: packageJSON.devServerConfig.proxy || {},
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/index.html' },
        { from: /./, to: '/index.html' }
      ]
    },
    before: function (app, server) {},
    after (app, server) {},
    allowedHosts: []
  }
}
