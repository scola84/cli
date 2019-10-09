import fs from 'fs-extra'
import { generateHeader } from './header'

function rmdir (box, path, prefix = path) {
  const header = generateHeader()
  const files = fs.readdirSync(path)

  let filePath = null

  files.sort().forEach((file) => {
    filePath = `${path}/${file}`

    if (fs.lstatSync(filePath).isDirectory() === true) {
      rmdir(box, filePath, prefix)
    } else {
      const content = String(fs.readFileSync(filePath))

      if (content.slice(0, header.length) === header) {
        box.cleaned.push(filePath.replace(prefix, ''))

        if (Boolean(box.dryRun) === false) {
          fs.unlinkSync(filePath)
        }
      }
    }
  })

  try {
    fs.rmdirSync(path)
  } catch (e) {
    //
  }
}

export function generateClean (box, callback) {
  rmdir(box, process.cwd())
  callback()
}
