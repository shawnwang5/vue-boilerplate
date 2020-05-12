const { exec } = require('child_process')
const path = require('path')
const chalk = require('chalk')
const projectPath = process.cwd()
const webpackPath = path.join(projectPath, 'node_modules/.bin/webpack')
const webpackConfigPath = path.join(projectPath, 'build/webpack.config.js')

function run() {
    const buildCommand = `${webpackPath} --config ${webpackConfigPath} --progress`
    console.log(chalk.blue(buildCommand))
    const child = exec(
        buildCommand,
        {
            maxBuffer: 2 * 1024 * 1024,
        },
        (error, stdout, stderr) => {
            if (error) {
                console.error(error.message)
            }
        }
    )

    child.stdout.pipe(process.stdout)
}

run()
