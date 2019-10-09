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

  const dir = __dirname.slice(0, -5)
  const sdir = `${dir}/src/cli/generate/pkg/template/partial/`

  readDir(sdir, (error, files) => {
    if (error !== null) {
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
