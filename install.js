'use strict'

const spawnSync = require('cross-spawn').sync

function install (opts, p) {
  let packages = []
  Object.keys(p.dependencies || {}).forEach(dep => {
    packages.push(dep + '@' + p.dependencies[dep])
  })

  if (!opts.production) {
    Object.keys(p.devDependencies || {}).forEach(dep => {
      packages.push(dep + '@' + p.devDependencies[dep])
    })
  }
  return new Promise((resolve, reject) => {
    packages.forEach(pkg => {
      console.log('Installing package ' + pkg)
      spawnSync('npm', ['install', pkg], { stdio: 'inherit' })
    })
    resolve()
  })
}

module.exports = install
