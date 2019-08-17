import { extractBody } from '../../../../../helper';
import { generateContent } from './content';

export function generatePartial(file, context) {
  const body = extractBody(file);
  let content = body.content.join('\n');

  if (body.begin) {
    content = content.split('');
    content.splice(content.lastIndexOf(';'), 1);
    content = content.join('');
  }

  return generateContent(content, context);
}
