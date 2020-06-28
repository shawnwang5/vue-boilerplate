const webpack = require('webpack')
const chalk = require('chalk')
const ora = require('ora')
const { webpackConfigPath } = require('../consts')
const webpackConfig = require(webpackConfigPath)

const spinner = ora(`Building for ${process.env.NODE_ENV}...`)
spinner.start()

function run() {
    const compiler = webpack(webpackConfig)
    compiler.run((err, stats) => {
        spinner.stop()
        if (err) {
            console.error(err.stack || err)
            if (err.details) {
                console.error(err.details)
            }
            return
        }
        const info = stats.toJson()
        if (stats.hasErrors()) {
            console.error(info.errors)
        }
        if (stats.hasWarnings()) {
            console.warn(info.warnings)
        }
        process.stdout.write(
            stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false,
            }) + '\n'
        )
        console.log(chalk.cyan('Build complete.\n'))
    })
}

run()
