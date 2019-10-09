/* eslint-disable no-console */

import 'source-map-support/register'

import {
  SqlBuilder,
  Worker
} from '@scola/lib'

import commander from 'commander'

import { version } from '../package.json'
import * as commands from './cli/'

SqlBuilder.setup()
Worker.setup()

console.fail = (box, data) => {
  if (data.logged === true) {
    return
  }

  data.logged = true

  if (data.message.slice(0, 5) === 'scola') {
    console.error(data.message)
  } else {
    console.error(data)
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
