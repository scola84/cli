/* eslint-disable no-console */

import { Slicer, Resolver, Worker } from '@scola/lib'
import { execSync } from 'child_process'
import { readdirSync } from 'fs'

const alias = {
  branch: 'git status | head -n 1',
  changes: 'git status -s',
  commit: [
    'git add package.json',
    'git add package-lock.json',
    'git commit -m "Update dependencies"'
  ],
  log: 'git log | head -n 5 | tail -n 1',
  major: [
    'npm version major',
    'npm publish',
    'push'
  ],
  minor: [
    'npm version minor',
    'npm publish',
    'push'
  ],
  patch: [
    'npm version patch',
    'npm publish',
    'push'
  ],
  push: 'git push --follow-tags'
}

function resolveCommand (box, command) {
  let resolvedCommand = command

  if (alias[resolvedCommand] !== undefined) {
    resolvedCommand = alias[resolvedCommand]
  }

  if (typeof resolvedCommand === 'string') {
    return resolvedCommand
  }

  return resolvedCommand.map((cmd) => {
    return resolveCommand(box, cmd)
  }).join(' && ')
}

export function execute (commander) {
  const handler = new Worker()

  const executer = new Worker({
    act (box, data) {
      const command = resolveCommand(box, box.command)
      const options = { cwd: data, stdio: 'inherit' }

      if (Boolean(box.recursively) === true) {
        console.log(data)
      }

      if (box.dryRun === true) {
        console.log(command)
      } else {
        try {
          execSync(command, options)
        } catch (error) {
          //
        }
      }

      console.log()

      this.pass(box, data)
    }
  })

  const resolver = new Resolver()

  const slicer = new Slicer({
    filter (box) {
      const cwd = process.cwd()

      if (Boolean(box.recursively) === false) {
        return [cwd]
      }

      return readdirSync(cwd).map((item) => {
        return `${cwd}/${item}`
      })
    }
  })

  handler
    .connect(slicer
      .bypass(resolver))
    .connect(executer)
    .connect(resolver)

  commander
    .command('execute <command>')
    .description('Execute command')
    .option('-d, --dry-run', 'Dry run the command')
    .option('-r, --recursively', 'Execute the command recursively')
    .action((command, options) => {
      handler.handle(Object.assign(options, {
        command
      }))
    })
}
