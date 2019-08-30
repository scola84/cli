import { Worker } from '@scola/worker'
import { execSync } from 'child_process'

const alias = {
  branch: 'git status | head -n 1',
  changes: 'git status -s',
  cdeps: [
    'git add package.json',
    'git add package-lock.json',
    'git commit -m "Update dependencies"'
  ],
  ideps: 'scola exec -c install',
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

export function custom () {
  function resolveOptions (box, command) {
    if (command.match(/^scola/)) {
      command += box.dryRun ? ' -d' : ''
      command += box.filter ? ` -f "${box.filter}"` : ''
      command += box.skip ? ` -s "${box.skip}"` : ''
    }

    return command
  }

  function resolveCommand (box, command) {
    if (alias[command]) {
      command = alias[command]
    }

    if (typeof command === 'string') {
      return resolveOptions(box, command)
    }

    return command.map((cmd) => {
      return resolveCommand(box, cmd)
    }).join(' && ')
  }

  return new Worker({
    act (box, data, callback) {
      const command = resolveCommand(box, box.command)

      this.log('cli', box, data, `${data}$ ${command}`)

      try {
        execSync(command, { cwd: data, stdio: 'inherit' })
      } catch (error) {
        data = error
      }

      console.log()

      this.pass(box, data, callback)
    }
  })
}
