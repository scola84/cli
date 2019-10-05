import { Worker } from '@scola/lib'
import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import { normalize } from 'path'

function readPackage () {
  const pkgFile = process.cwd() + '/package.json'

  return JSON.parse(
    readFileSync(
      pkgFile
    )
  )
}

export function clone (commander) {
  const handler = new Worker()

  const cloner = new Worker({
    act (box) {
      const destination = normalize(process.cwd() + '/' + box.destination)
      const exclude = box.exclude ? new RegExp(box.exclude) : null
      const include = new RegExp(box.include)

      let pkg = null

      try {
        pkg = readPackage()
      } catch (error) {
        this.log('fail', box, new Error('scola: Could not read package.json'))
        return
      }

      if (typeof pkg.dependencies !== 'object') {
        this.log('fail', box, new Error('scola: No dependencies found'))
        return
      }

      Object.keys(pkg.dependencies).forEach((dependency) => {
        if (dependency.match(include) && !dependency.match(exclude)) {
          let [scope, name] = dependency.split('/')
          name = name || scope

          const command = `git clone ${box.source}/${name} ${destination}/${scope}/${name}`
          const options = { cwd: process.cwd(), stdio: 'inherit' }

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
    }
  })

  handler
    .connect(cloner)

  commander
    .command('clone <source> <destination>')
    .description('Clone dependencies')
    .option('-d, --dry-run', 'Dry run the command')
    .option('-e, --exclude <exclude>', 'Exclude these dependencies (regexp)', null)
    .option('-i, --include <include>', 'Include these dependencies (regexp)', '.*')
    .action((source, destination, options) => {
      handler.handle(Object.assign(options, {
        source,
        destination
      }))
    })
}
