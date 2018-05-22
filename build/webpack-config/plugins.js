const path = require('path')
const os = require('os')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const projectPath = __dirname.replace(`build${path.sep}webpack-config`, '')

function getAccessUrlArray () {
    const result = []
    const netInterfaces = Object.entries(os.networkInterfaces())
    for (let netInterface of netInterfaces) {
        const interfaceInfo = netInterface[ 1 ]
        interfaceInfo.forEach(ipObj => {
            if (ipObj.family === 'IPv4') {
                result.push(` - Access URL: http://${ipObj.address}:${process.env.port}/index.html`)
            }
        })
    }
    return result
}

const compileMessages = () => {
    const messages = []
    if (!isProduction) {
        return getAccessUrlArray().concat(messages)
    }
    return messages
}

const plugins = [
    new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
            messages: compileMessages(),
            notes: []
        },
        clearConsole: true,
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[hash].css',
    }),
    new HtmlWebpackPlugin({
        favicon: `${projectPath}public/favicon.ico`,
        minify: {
            removeRedundantAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            collapseBooleanAttributes: true
        },
        template: path.resolve(projectPath, 'public/index.html'),
    }),
]

if (process.env.isAnalyze) {
    plugins.push(new BundleAnalyzerPlugin())
}

module.exports = plugins
