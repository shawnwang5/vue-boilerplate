const path = require('path')
const devServer = require('./webpack-config/dev-server.js')
const ModuleConfig = require('./webpack-config/module.js')
const optimization = require('./webpack-config/optimization.js')
const plugins = require('./webpack-config/plugins.js')
const projectPath = __dirname.replace(/build$/, '')
const { webpackConfig } = require(`${projectPath}package.json`)

module.exports = {
    mode: process.env.NODE_ENV,
    stats: 'errors-only',
    entry: {
        app: [ `${projectPath}/src/main.ts` ],
    },
    output: {
        filename: 'js/[name][hash].js',
        chunkFilename: 'js/[name][hash].js',
        path: path.resolve(projectPath, 'dist'),
        publicPath: process.env.baseUrl,
    },
    resolve: {
        alias: {
            '@': path.resolve(projectPath, 'src'),
        },
        extensions: [ '.ts', '.js', '.json' ],
        mainFiles: [ 'index' ],
        modules: [ `${projectPath}src`, `node_modules` ],
    },
    performance: {
        hints: false
    },
    optimization,
    plugins,
    module: ModuleConfig,
    devServer,
}
