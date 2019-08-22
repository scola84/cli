import findup from 'find-up';
import fs from 'fs-extra';

export function setupOptions(box, data, callback) {
  box.changed = [];
  box.cleaned = [];
  box.failed = [];
  box.unchanged = [];
  box.unprovisioned = [];

  if ((box.host || '').match(/mysql|postgresql/) === null) {
    if (Boolean(box.clean) === false) {
      throw new Error('scola: Provide a valid host using -h');
    }
  }

  if (typeof box.object === 'undefined') {
    if (Boolean(box.clean) === false) {
      throw new Error('scola: Provide a valid object name using -o');
    }
  }

  const options = findup
    .sync('.jsbeautifyrc.json');

  box.beautify = options ? JSON.parse(
    fs.readFileSync(options)
  ) : {};

  callback();
}
