const path = require('path')
const projectPath = __dirname.replace(`build${path.sep}webpack-config`, '')
const { devServerConfig } = require(`${projectPath}package.json`)

module.exports = {
    watchContentBase: true,
    useLocalIp: true,
    open: true,
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
    after (app, server) {
    },
    allowedHosts: []
}
