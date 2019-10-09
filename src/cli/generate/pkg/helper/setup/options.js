import findup from 'find-up'
import fs from 'fs-extra'

export function setupOptions (box, data, callback) {
  box.changed = []
  box.cleaned = []
  box.failed = []
  box.unchanged = []
  box.unprovisioned = []

  if ((box.host || '').match(/mysql|postgresql/) === null) {
    if (Boolean(box.clean) === false) {
      throw new Error('scola: Provide a valid host using -h')
    }
  }

  if (box.name === undefined) {
    if (Boolean(box.clean) === false) {
      throw new Error('scola: Provide a valid object name using -n')
    }
  }

  const options = findup.sync('.jsbeautifyrc')

  box.beautify = options === undefined
    ? {}
    : JSON.parse(fs.readFileSync(options))

  box.standard = {
    fix: true
  }

  callback()
}
