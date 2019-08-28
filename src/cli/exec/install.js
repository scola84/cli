import { Worker } from '@scola/worker'
import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import glob from 'glob'
import trim from 'lodash-es/trim'

const builtins = [
  '..',
  '.',
  'child_process',
  'cluster',
  'crypto',
  'fs',
  'http',
  'net',
  'os',
  'path',
  'process',
  'readline',
  'stream',
  'tls',
  'url',
  'util'
]

export function install () {
  return new Worker({
    act (box, data, callback) {
      const files = glob.sync(
        process.cwd() + '/' + (box.filter || 'src/**/*.js')
      )

      const modules = new Set()
      const self = process.cwd().split('/').slice(-2).join('/')

      files.forEach((file) => {
        const data = readFileSync(file)
        const matches = String(data).match(/^import[^']* '(.*)'/gm) || []

        let module = null
        let scope = null

        matches.forEach((match) => {
          module = trim(match.slice(match.indexOf('\'')), ' \';');

          [scope, module] = module.split('/')

          module = module && scope.slice(0, 1) === '@'
            ? ([scope, module].join('/')) : scope

          if (builtins.indexOf(module) === -1) {
            if (module !== self) {
              modules.add(module)
            }
          }
        })
      })

      const pkgFile = process.cwd() + '/package.json'

      const pkg = readFileSync(pkgFile)
      const json = JSON.parse(String(pkg))
      delete json.dependencies

      writeFileSync(pkgFile, JSON.stringify(json))

      const names = Array.from(modules).sort()
      const options = { cwd: process.cwd(), stdio: 'inherit' }
      const skip = box.skip ? new RegExp(box.skip) : null

      names.forEach((name) => {
        if (skip === null || name.match(skip) === null) {
          execSync(`npm install ${name}`, options)
        }
      })

      execSync('npm install', options)
    }
  })
}
