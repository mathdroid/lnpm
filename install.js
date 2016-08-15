'use strict'
const path = require('path')
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
  let pkgs = packages.join(';')
  console.log(pkgs)
//   // let script = ['echo', 'hey']
//   let script = `dependencies=${pkgs}
// array=(\${dependencies//;/ })
// for element in "\${array[@]}"
// do
//     echo -e "  Package: $element"
//     npm install --verbose "$element"
// done
// `.split('\n').reduce((previous, current) => {
//   return [].concat(previous, current.split(' '))
// }, [])
// console.log(script)
  return new Promise((resolve, reject) => {
    let shPath = path.join(process.mainModule.filename, '..', 'lnpm.sh')
    let proc = spawnSync(shPath, [pkgs], {stdio: 'inherit'})
    if (proc.status === 0) resolve(proc.status)
    reject(proc.status)
    // console.log(process)
  })
}

module.exports = install
