#! /usr/bin/env node
'use strict'

const meow = require('meow')
const spawnSync = require('cross-spawn').sync
const path = require('path')

const install = require('./install')

function run (argv) {
  const cli = meow(`
      Usage
        $ l.npm install

  `, {
      alias: {
      }
  })

  const cmd = getCommandFullName(cli.input[0])

  if ((cmd !== 'install' && cmd !== 'help') || cli.input.length > 1) {
    console.log('Routing "npm ' + (cmd || '') + '" to npm instead.')
    spawnSync('npm', argv, { stdio: 'inherit' })
    return Promise.resolve()
  }
  // spawnSync('cat', ['package.json'], { stdio: 'inherit' })
  let procPath = path.join(process.cwd(), 'package.json')
  let p = require(procPath)

  let opts = {}
  Object.keys(cli.flags).forEach(key => {
    opts[key] = opts[key] || cli.flags[key]
  })
  // console.log(procPath)
  // console.log(opts)

  return install(opts, p)

}

function getCommandFullName (cmd) {
  switch (cmd) {
    case 'install':
    case 'i':
      return 'install'
    case 'help':
      return 'help'
    default:
      return cmd
  }
}

module.exports = run
if (!module.parent) run(process.argv.slice(2)).catch(reason => {
  console.log(reason)
})
