const path = require('path')
const os = require('os')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const projectPath = process.cwd()

const plugins = [
    new CleanWebpackPlugin({
        verbose: true,
        cleanStaleWebpackAssets: false,
        cleanOnceBeforeBuildPatterns: ['**/*'],
    }),
    new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
            messages: compileMessages(),
            notes: [],
        },
        clearConsole: true,
    }),
    new webpack.DllReferencePlugin({
        context: projectPath,
        manifest: require(path.join(
            projectPath,
            'public/vendor/manifest.json'
        )),
    }),
    new webpack.IgnorePlugin({
        checkResource: (resourcePath) => {
            if (/moment\/locale\/(?!zh-cn)/.test(resourcePath)) {
                return true
            }
        },
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[hash].css',
    }),
    new HtmlWebpackPlugin({
        favicon: path.join(projectPath, 'public/favicon.ico'),
        minify: {
            removeRedundantAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            collapseBooleanAttributes: true,
        },
        template: path.resolve(projectPath, 'public/index.html'),
    }),
    new CopyWebpackPlugin([
        { from: 'public/vendor', to: 'vendor', context: projectPath },
    ]),
]

if (process.env.isAnalyze) {
    plugins.push(new BundleAnalyzerPlugin())
}

function getAccessUrlArray() {
    const result = []
    const netInterfaces = Object.entries(os.networkInterfaces())
    for (let netInterface of netInterfaces) {
        const interfaceInfo = netInterface[1]
        interfaceInfo.forEach((ipObj) => {
            if (ipObj.family === 'IPv4') {
                result.push(
                    ` - Access URL: http://${ipObj.address}:${process.env.port}/index.html`
                )
            }
        })
    }
    return result
}

function compileMessages() {
    const messages = []
    if (!isProduction) {
        return getAccessUrlArray().concat(messages)
    }
    return messages
}

module.exports = plugins
