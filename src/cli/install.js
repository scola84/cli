/* eslint-disable no-console */

import { Worker } from '@scola/lib'
import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import glob from 'glob'
import trim from 'lodash-es/trim'
import omit from 'lodash-es/omit'

const builtins = [
  '..',
  '.',
  'child_process',
  'cluster',
  'crypto',
  'fs',
  'http',
  'https',
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

const commands = {
  npm: {
    add: (dependency = '') => `npm install ${dependency}`.trim(),
    install: () => 'npm install'
  },
  yarn: {
    add: (dependency = '') => `yarn add ${dependency}`.trim(),
    install: () => 'yarn install'.trim()
  }
}

export function install (commander) {
  const handler = new Worker()

  const installer = new Worker({
    act (box) {
      const exclude = box.exclude ? new RegExp(box.exclude) : null
      const include = new RegExp(box.include)

      const files = glob.sync(`${process.cwd()}/${box.files}`)

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
            ? ([scope, module].join('/'))
            : scope

          if (builtins.indexOf(module) === -1) {
            if (module !== self) {
              modules.add(module)
            }
          }
        })
      })

      const pkgFile = `${process.cwd()}/package.json`
      const pkg = JSON.parse(readFileSync(pkgFile))

      let hasErrors = false
      let shouldAdd = false

      try {
        if (Boolean(box.dryRun) === false) {
          writeFileSync(pkgFile, JSON.stringify(omit(pkg, 'dependencies')))
        }
      } catch (error) {
        this.log('fail', box, new Error('scola: Could not read package.json'))
        return
      }

      const dependencies = Array.from(modules).sort()
      const options = { cwd: process.cwd(), stdio: 'inherit' }

      dependencies.forEach((dependency) => {
        if (hasErrors === true) {
          return
        }

        shouldAdd = dependency.match(include) !== null &&
          dependency.match(exclude) === null

        if (shouldAdd === true) {
          const command = commands[box.program].add(dependency)

          if (box.dryRun === true) {
            console.log(command)
          } else {
            try {
              execSync(command, options)
            } catch (error) {
              hasErrors = true
            }
          }
        }
      })

      if (hasErrors === true) {
        writeFileSync(pkgFile, JSON.stringify(pkg))
        this.log('fail', box,
          new Error('scola: Errors occurred while installing dependencies'))
        return
      }

      if (box.dryRun === true) {
        console.log(commands[box.program].install())
      } else {
        try {
          execSync(commands[box.program].install(), options)
        } catch (error) {
          //
        }
      }
    }
  })

  handler
    .connect(installer)

  commander
    .command('install')
    .description('Install dependencies')
    .option('-d, --dry-run', 'Dry run the command')
    .option('-e, --exclude <exclude>', 'Exclude these dependencies (regexp)', null)
    .option('-f, --files <files>', 'Read from these files (glob)', 'src/**/*.js')
    .option('-i, --include <include>', 'Include these dependencies (regexp)', '.*')
    .option('-p, --program <program>', 'Install with this program (npm|yarn)', 'yarn')
    .action((options) => {
      handler.handle(options)
    })
}
