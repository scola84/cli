import Handlebars from 'handlebars'
import handlebarsHelpers from 'handlebars-helpers'
import readDir from 'recursive-readdir'
import * as scolaHelpers from '../../template/helper'
import { generatePartial } from '../generate'

export function setupHandlebars (box, data, callback) {
  handlebarsHelpers.comparison()

  Object.keys(scolaHelpers).forEach((name) => {
    Handlebars.registerHelper(name, scolaHelpers[name])
  })

  const sdir = __dirname.slice(0, -5) +
    '/src/cli/gen/pkg/template/partial/'

  readDir(sdir, (error, files) => {
    if (error) {
      callback(error)
      return
    }

    files.forEach((file) => {
      Handlebars.registerPartial(
        file.split('/').pop().slice(0, -3),
        (context) => generatePartial(file, context)
      )
    })

    callback()
  })
}
