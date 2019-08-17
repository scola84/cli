import fs from 'fs-extra';

export function extractBody(file) {
  const content = String(fs.readFileSync(file))
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

  return {
    begin,
    end,
    content: content.slice(begin, end)
  };
}
