const path = require('path')
const projectPath = process.cwd()
const { devServerConfig } = require(path.join(projectPath, 'package.json'))

module.exports = {
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
    proxy: devServerConfig.proxy || {},
    historyApiFallback: {
        rewrites: [
            { from: /^\/$/, to: '/index.html' },
            { from: /./, to: '/index.html' }
        ]
    },
    before: function (app, server) {
    },
    after(app, server) {
    },
    allowedHosts: []
}
