import fs from 'fs-extra';
import { generateContent } from './content';

export function generatePartial(file, context) {
  let content = String(fs.readFileSync(file))
    .split(/\r?\n/);

  let begin = 0;
  let end = void 0;

  for (let i = 0; i < content.length; i += 1) {
    if (content[i].slice(0, 6) === 'export') {
      begin = i + 1;
      end = -2;
      break;
    }
  }

  content = content
    .slice(begin, end)
    .join('\n');

  if (begin) {
    content = content.split('');
    content.splice(content.lastIndexOf(';'), 1);
    content = content.join('');
  }

  return generateContent(content, context);
}
