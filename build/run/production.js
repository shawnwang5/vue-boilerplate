const { exec, execSync } = require('child_process')
const path = require('path')
const projectPath = __dirname.replace(`build${path.sep}run`, '')

function run () {
    execSync('rm -rf dist/*')
    const child = exec(`${projectPath}node_modules/.bin/webpack --config ${projectPath}build/webpack.config.js`, (error, stdout, stderr) => {
        if (error) {
            console.error(error.message)
        }
    })
    child.stdout.on('data', (chunk) => {
        console.log(chunk.toString())
    })
}

run()
