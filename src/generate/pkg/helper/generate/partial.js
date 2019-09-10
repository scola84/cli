import fs from 'fs-extra'
import { generateContent } from './content'

export function generatePartial (file, context) {
  let content = String(fs.readFileSync(file))
  const match = content.match(/export/)

  content = content.slice(
    match ? content.indexOf('{', match.index) + 1 : 0,
    match ? content.lastIndexOf('}') : content.length
  )

  content = match
    ? content.trim().replace('//', '')
    : content

  return generateContent(
    content,
    context
  )
}
