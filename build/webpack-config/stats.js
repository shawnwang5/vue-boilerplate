const { isServe } = require('../consts')

module.exports = (() => {
    if (isServe) {
        return 'errors-warnings'
    }
    return {
        assets: true,
        assetsSort: '!size',
        cached: true,
        builtAt: true,
        cachedAssets: true,
        children: true,
        chunksSort: '!size',
        chunkGroups: true,
        chunkModules: true,
        chunkOrigins: true,
        chunks: true,
        colors: true,
        depth: true,
        entrypoints: true,
        env: true,
        errorDetails: true,
        errors: true,
    }
})()
