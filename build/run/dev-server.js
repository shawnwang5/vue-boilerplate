#!/usr/bin/env node

const spawn = require('cross-spawn')
let port = process.env.port || 9000
const { webpackConfigPath } = require('../consts')

function run() {
    const command = `npx webpack-dev-server --config ${webpackConfigPath} --color`
    let file = '/bin/sh'
    let args = ['-c', command]
    if (process.platform === 'win32') {
        file = process.env.comspec || 'cmd.exe'
        args = ['/s', '/c', command]
    }

    const child = spawn(file, args, {
        stdio: ['inherit', 'inherit', 'pipe'],
        env: { ...process.env, IS_SERVE: 'true', port },
    })
    child.stderr.on('data', errMsg => {
        console.error(`stderr: ${errMsg}`)
        if (errMsg.includes('address already in use')) {
            console.clear()
            port++
            run()
            return
        }
    })
    child.on('close', code => {
        console.log(`closed, code: ${code}`)
    })
}

run()
