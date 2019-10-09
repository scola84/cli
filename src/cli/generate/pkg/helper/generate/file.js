import beautify from 'js-beautify'
import fs from 'fs-extra'
import standard from 'standard'
import { generateContent } from './content'
import { generateHeader } from './header'

export function generateFile (box, data, source, target) {
  const header = generateHeader()
  const name = target.replace(`${process.cwd()}/`, '')

  let targetContent = null

  try {
    targetContent = String(fs.readFileSync(target))
  } catch (e) {
    targetContent = header
  }

  if (targetContent.slice(0, header.length) !== header) {
    box.unprovisioned.push(name)
    return
  }

  let sourceContent = String(fs.readFileSync(source))

  try {
    sourceContent = generateContent(sourceContent, data)
    sourceContent = `${header}\n\n${sourceContent}`
    sourceContent = beautify(sourceContent, box.beautify)
  } catch (error) {
    box.failed.push(`${name} (${error})`)
    return
  }

  let fixedContent = sourceContent

  while (fixedContent) {
    try {
      fixedContent = standard.lintTextSync(fixedContent, box.standard)
      fixedContent = fixedContent.results[0].output
      sourceContent = fixedContent || sourceContent
    } catch (error) {
      box.failed.push(`${name} (${error})`)
      return
    }
  }

  if (sourceContent === targetContent) {
    box.unchanged.push(name)
  } else {
    box.changed.push(name)
  }

  if (Boolean(box.dryRun) === false) {
    fs.ensureFileSync(target)
    fs.writeFileSync(target, sourceContent)
  }
}
