import readDir from 'recursive-readdir'
import { generateFile } from './file'
import { generateOptions } from './options'

export function generateDir (box, data, callback, base, name) {
  const sdir = __dirname.slice(0, -5) +
    '/src/cli/generate/pkg/template/' +
    base

  const tdir = process.cwd() + '/' + (box.out)

  generateOptions(box, data, tdir, () => {
    readDir(sdir, (error, files) => {
      if (error) {
        callback(error)
        return
      }

      files.sort().forEach((source) => {
        let target = source
          .replace(sdir, tdir)
          .split('/')

        const section = ['api', 'cmn', 'gui'].find((sct) => {
          return target.indexOf(sct) > -1
        })

        if (name) {
          target.splice(target.indexOf(section) + 2, 0, name)
        }

        target = target.join('/')

        generateFile(box, data, source, target)
      })

      callback()
    })
  })
}
