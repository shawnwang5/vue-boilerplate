const webpack = require('webpack')
const os = require('os')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const projectPath = process.cwd()
const { webpackConfig } = require(path.join(projectPath, 'package.json'))
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { dllArray } = require(path.join(projectPath, 'dll.config.js'))

const dllPath = 'public/vendor'

module.exports = {
    entry: {
        vendor: [
            'vue',
            'vue-router',
            'vuex',
            'vue-class-component',
            'vuex-class',
            'vue-property-decorator',
            'axios',
            'throttle-debounce',
            ...dllArray,
        ],
    },
    output: {
        path: path.join(projectPath, dllPath),
        filename: '[name].dll.js',
        sourceMapFilename: '[name].map',
        pathinfo: true,
        library: '[name]_dll',
    },
    plugins: [
        new CleanWebpackPlugin({
            verbose: true,
            cleanStaleWebpackAssets: false,
            cleanOnceBeforeBuildPatterns: ['**/*'],
        }),
        new VueLoaderPlugin(),
        new webpack.DllPlugin({
            context: projectPath,
            path: path.resolve(projectPath, dllPath, 'manifest.json'),
            name: '[name]_dll',
        }),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                test: /\.js$/i,
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
    },
    module: {
        rules: [
            { test: /\.vue$/, use: ['vue-loader'] },
            {
                test: /\.s?css$/,
                use: [
                    isProduction
                        ? MiniCssExtractPlugin.loader
                        : 'vue-style-loader',
                    'css-loader',
                    'sass-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: { appendTsSuffixTo: [/\.vue$/] },
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                exclude: (resourcePath) => {
                    const transplieRegArray = [
                        ...webpackConfig.transpileModules,
                    ]
                    if (/\Wnode_modules\W/.test(resourcePath)) {
                        for (
                            let i = 0, len = transplieRegArray.length;
                            i < len;
                            i++
                        ) {
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
                use: ['babel-loader'],
            },
        ],
    },
}
