import fs from 'fs-extra';

export function extractBody(file) {
  return String(fs.readFileSync(file))
    .trim()
    .split(/\r?\n/).slice(1, -1)
    .join('\r\n')
    .slice(0, -1);
}
