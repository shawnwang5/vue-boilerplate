const path = require('path')
const projectPath = process.cwd()
const packageJSONPath = path.join(projectPath, 'package.json')
const packageJSON = require(packageJSONPath)
const webpackConfigPath = path.join(projectPath, 'build/webpack.config.js')
const dllConfigPath = path.join(projectPath, 'dll.config.js')
const dllConfig = require(dllConfigPath)
const isProduction = process.env.NODE_ENV === 'production'
const isServe = !!process.env.IS_SERVE
const isAnalyze = !!process.env.IS_ANALYZE
const envFilename = isProduction ? '.env.prod' : '.env.dev'
const envFilePath = path.join(projectPath, `src/environments/${envFilename}`)

module.exports = {
    projectPath,
    packageJSONPath,
    packageJSON,
    webpackConfigPath,
    dllConfigPath,
    dllConfig,
    dllPath: 'public/vendor',
    envFilePath,
    isProduction,
    isServe,
    isAnalyze,
}
