import 'source-map-support/register'

import { setup } from '@scola/lib'
import commander from 'commander'

import { version } from '../package.json'
import * as commands from './cli/'

setup.api()

console.out = (type, box, data) => {
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
