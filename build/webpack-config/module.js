const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const projectPath = __dirname.replace(`build${path.sep}webpack-config`, '')
const { webpackConfig } = require(`${projectPath}package.json`)

module.exports = {
    rules: [
        {
            test: /\.(ico)$/,
            loader: 'url-loader',
            options: { name: 'config/images/[name].[ext]' }
        },
        {
            test: /\.(png|svg|jpg|gif)$/, use: [ {
                loader: 'file-loader',
                options: { name: 'img/[name].[hash].[ext]' }
            } ]
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/, use: [ {
                loader: 'file-loader',
                options: { name: 'font/[name].[hash].[ext]' }
            } ]
        },
        { test: /\.vue$/, use: [ 'vue-loader' ] },
        {
            test: /\.s?css$/,
            use: [
                isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader', 'css-loader', 'sass-loader', 'postcss-loader'
            ]
        },
        {
            test: /\.ts$/,
            loader: 'ts-loader',
            options: { appendTsSuffixTo: [ /\.vue$/ ] },
            exclude: /node_modules/
        },
        {
            test: /\.js$/,
            exclude: (resource) => {
                if (/node_modules/.test(resource)) {
                    const excludeRegArray = webpackConfig.transpileModules
                    for (let i = 0; i < excludeRegArray.length; i++) {
                        return !resource.includes(excludeRegArray[ i ])
                    }
                    return true
                }
            },
            use: [ 'babel-loader' ]
        },
    ]
}
