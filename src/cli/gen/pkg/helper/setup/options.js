import findup from 'find-up';
import fs from 'fs-extra';

export function setupOptions(box, data, callback) {
  if ((box.host || '').match(/mysql|postgresql/) === null) {
    throw new Error('scola: Provide a valid host using -h');
  }

  if (typeof box.object === 'undefined') {
    throw new Error('scola: Provide a valid object name using -o');
  }

  const options = findup
    .sync('.jsbeautifyrc.json');

  box.beautify = options ? JSON.parse(
    fs.readFileSync(options)
  ) : {};

  box.changed = [];
  box.unchanged = [];
  box.unprovisioned = [];

  callback();
}
