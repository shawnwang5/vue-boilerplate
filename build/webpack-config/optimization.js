const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    minimizer: [
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: [ 'default', { discardComments: { removeAll: true } } ],
            },
            canPrint: true
        }),
        new UglifyJsPlugin({
            test: /\.js$/i,
            extractComments: false,
            uglifyOptions: {
                warnings: false,
                mangle: true,
                keep_fnames: false,
                output: {
                    comments: false,
                    quote_style: '1', // 只用单引号
                },
            },
        }),
    ],
    splitChunks: {
        chunks: 'all',
        maxSize: 600 * 1024,
        minSize: 400 * 1024,
        minChunks: 1,
        automaticNameDelimiter: '.',
        name: 'vendors',
    },
}
