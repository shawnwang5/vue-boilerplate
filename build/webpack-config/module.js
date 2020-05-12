const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const projectPath = process.cwd()
const { webpackConfig } = require(path.join(projectPath, 'package.json'))

module.exports = {
    rules: [
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: { name: 'img/[name].[hash].[ext]' },
                },
            ],
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: { name: 'font/[name].[hash].[ext]' },
                },
            ],
        },
        { test: /\.vue$/, use: ['vue-loader'] },
        {
            test: /\.s?css$/,
            use: [
                isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
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
                const transplieRegArray = [...webpackConfig.transpileModules]
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
}
