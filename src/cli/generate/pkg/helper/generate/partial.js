import fs from 'fs-extra'
import { generateContent } from './content'

export function generatePartial (file, context) {
  let content = String(fs.readFileSync(file))
  const match = content.match(/export/)

  content = content.slice(
    match === null ? 0 : content.indexOf('{', match.index) + 1,
    match === null ? content.length : content.lastIndexOf('}')
  )

  content = match === null
    ? content
    : content.trim().replace('//', '')

  return generateContent(
    content,
    context
  )
}
