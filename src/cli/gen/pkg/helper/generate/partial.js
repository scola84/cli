import { extractBody } from '../../../../../helper'
import { generateContent } from './content'

export function generatePartial (file, context) {
  return generateContent(
    extractBody(file).join('\n'),
    context
  )
}
