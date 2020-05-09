const { exec } = require('child_process')
const path = require('path')
const fs = require('fs')
const fsUtils = require('nodejs-fs-utils')
const chalk = require('chalk')
const projectPath = __dirname.replace(`build${path.sep}run`, '')
const distDirPath = path.join(projectPath, 'dist')
const webpackPath = path.join(projectPath, 'node_modules/.bin/webpack')
const webpackConfigPath = path.join(projectPath, 'build/webpack.config.js')

function run () {
    console.log(chalk.red(`remove dir: ${distDirPath}`))
    fsUtils.removeSync(distDirPath, {
        skipErrors: true, fs,
    })
    const buildCommand = `${webpackPath} --config ${webpackConfigPath}`
    console.log(chalk.blue(buildCommand))
    const child = exec(buildCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(error.message)
        }
    })
    child.stdout.on('data', (chunk) => {
        console.log(chunk.toString())
    })
}

run()
