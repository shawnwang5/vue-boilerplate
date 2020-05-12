const os = require('os')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

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
        new TerserPlugin({
            test: /\.js$/i,
            exclude: /^vendor/,
            parallel: os.cpus().length,
            sourceMap: true,
            extractComments: false,
            terserOptions: {
                ecma: 5,
                warnings: false,
                parse: {},
                compress: {},
                mangle: true,
                keep_classnames: false,
                keep_fnames: false,
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
        maxSize: 600 * 1024,
        minSize: 400 * 1024,
        minChunks: 1,
        automaticNameDelimiter: '.',
        name: 'vendors',
    },
}
