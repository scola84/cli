import 'source-map-support/register'

import { setup as setupDoc } from '@scola/doc'
import commander from 'commander'

import { version } from './package.json'
import * as commands from './src/'

setupDoc()

console.out = (type, worker, box, data, line) => {
  if (type === 'fail' && !data.logged) {
    data.logged = true

    if (data.message.slice(0, 5) === 'scola') {
      console.error(data.message)
    } else {
      console.error(data)
    }
  }
}

Object.keys(commands).forEach((command) => {
  commands[command](commander)
})

commander
  .version(version)
  .parse(process.argv)

if (process.argv.length === 2) {
  commander.help()
}
