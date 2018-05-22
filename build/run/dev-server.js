const { exec } = require('child_process')
const path = require('path')
const projectPath = __dirname.replace(`build${path.sep}run`, '')
let port = process.env.port || 9000

function run () {
    const child = exec(`${projectPath}node_modules/.bin/webpack-dev-server --config ${projectPath}build/webpack.config.js --color`, {
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
    child.stdout.on('data', (chunk) => {
        console.log(chunk.toString())
    })
}

run()
