const { exec } = require('child_process')
const chalk = require('chalk')
const path = require('path')
const projectPath = process.cwd()
let port = process.env.port || 9000
const webpackDevServerPath = path.join(projectPath, 'node_modules/.bin/webpack-dev-server')
const webpackConfigPath = path.join(projectPath, 'build/webpack.config.js')

function run() {
    const buildCommand = `${webpackDevServerPath} --config ${webpackConfigPath} --color --progress`
    console.log(chalk.blue(buildCommand))
    const child = exec(buildCommand, {
        maxBuffer: 2 * 1024 * 1024,
        env: {
            port,
        },
    }, (error, stdout, stderr) => {
        if (error) {
            if (error.message.includes('address already in use')) {
                console.clear()
                port++
                run()
                return
            }
            console.error(error.message)
        }
    })
    child.stdout.pipe(process.stdout)
}

run()
