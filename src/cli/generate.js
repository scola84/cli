import { Router, Worker } from '@scola/lib'

import {
  app,
  pkg
} from './generate/'

export function generate (commander) {
  const handler = new Worker()

  const router = new Router({
    filter (box) {
      return box.type
    }
  })

  const unifier = new Worker()

  handler
    .connect(router)

  router
    .connect('app', app())
    .connect(unifier)

  router
    .connect('pkg', pkg())
    .connect(unifier)

  commander
    .command('generate <type>')
    .description('Generate code')
    .option('-c, --clean', 'Clean provisioned files')
    .option('-d, --dry-run', 'Dry run the command')
    .option('-h, --host <host>', 'Read from this database host')
    .option('-n, --name <name>', 'Generate code for this object')
    .option('-o, --out <out>', 'Write the files into this directory', 'src/')
    .action((type, options) => {
      handler.handle(Object.assign(options, {
        type
      }))
    })
}
