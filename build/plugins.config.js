const path = require('path')
const os = require('os')
const fs = require('fs')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { projectPath, envFilePath, isServe, isAnalyze } = require('./consts')

const plugins = [
  new FriendlyErrorsWebpackPlugin({
    compilationSuccessInfo: {
      messages: compileMessages(),
      notes: []
    },
    clearConsole: true
  }),
  new webpack.DefinePlugin(getDefinePluginObj()),
  new webpack.DllReferencePlugin({
    context: projectPath,
    manifest: require(path.join(projectPath, 'public/vendor/manifest.json'))
  }),
  new webpack.IgnorePlugin({
    checkResource: resourcePath => {
      if (/moment\/locale\/(?!zh-cn)/.test(resourcePath)) {
        return true
      }
      return false
    }
  }),
  new VueLoaderPlugin(),
  new MiniCssExtractPlugin({
    filename: 'css/[name].[hash].css',
    chunkFilename: 'css/[name].[hash].css'
  }),
  new HtmlWebpackPlugin({
    favicon: path.join(projectPath, 'public/favicon.ico'),
    minify: {
      removeRedundantAttributes: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeComments: true,
      collapseBooleanAttributes: true
    },
    template: path.resolve(projectPath, 'public/index.html')
  }),
  new CopyWebpackPlugin([
    { from: 'public/vendor', to: 'vendor', context: projectPath }
  ])
]

if (!isServe) {
  plugins.unshift(
    new CleanWebpackPlugin({
      verbose: true,
      cleanStaleWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: ['**/*']
    })
  )
}

if (isAnalyze) {
  plugins.push(new BundleAnalyzerPlugin())
}

function getDefinePluginObj () {
  const obj = {}
  for (let p of Object.keys(process.env)) {
    if (p.startsWith('VUE_')) {
      obj[p] = process.env[p]
    }
  }
  if (fs.existsSync(envFilePath) && fs.statSync(envFilePath).isFile()) {
    const fileContent = fs.readFileSync(envFilePath).toString()
    const array = fileContent.split(/[\r\n]/)
    for (let i = 0, len = array.length; i < len; i++) {
      const curRow = array[i].trim()
      if (!curRow || curRow.startsWith('#')) {
        continue
      }
      const itemArray = curRow.split('=')
      const key = itemArray[0]
      const value = itemArray[1]
      process.env[key] = value
      obj[key] = `'${value}'`
    }
  }
  return obj
}

function getAccessUrlArray () {
  const result = []
  const netInterfaces = Object.entries(os.networkInterfaces())
  for (let netInterface of netInterfaces) {
    const interfaceInfo = netInterface[1]
    interfaceInfo.forEach(ipObj => {
      if (ipObj.family === 'IPv4') {
        result.push(
          ` - Access URL: http://${ipObj.address}:${process.env.port}/index.html`
        )
      }
    })
  }
  return result
}

function compileMessages () {
  const messages = []
  if (isServe) {
    return getAccessUrlArray().concat(messages)
  }
  return messages
}

module.exports = plugins
