import { Worker } from '@scola/worker'
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

function writePackage () {
  const pkgFile = process.cwd() + '/package.json'

  writeFileSync(
    pkgFile,
    JSON.stringify(
      omit(
        JSON.parse(
          readFileSync(
            pkgFile
          )
        ),
        'dependencies'
      )
    )
  )
}

export function install (commander) {
  const handler = new Worker()

  const installer = new Worker({
    act (box) {
      const exclude = box.exclude ? new RegExp(box.exclude) : null
      const include = new RegExp(box.include)

      const files = glob.sync(
        process.cwd() + '/' + box.files
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

      try {
        if (Boolean(box.dryRun) === false) {
          writePackage()
        }
      } catch (error) {
        this.log('fail', box, new Error('scola: Could not read package.json'))
        return
      }

      const dependencies = Array.from(modules).sort()
      const options = { cwd: process.cwd(), stdio: 'inherit' }

      dependencies.forEach((dependency) => {
        if (dependency.match(include) && !dependency.match(exclude)) {
          const command = `npm install ${dependency}`

          if (box.dryRun) {
            console.log(command)
          } else {
            try {
              execSync(command, options)
            } catch (error) {
              //
            }
          }
        }
      })

      if (box.dryRun) {
        console.log('npm install')
      } else {
        try {
          execSync('npm install', options)
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
    .action((options) => {
      handler.handle(options)
    })
}
