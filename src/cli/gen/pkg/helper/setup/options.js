import findup from 'find-up';
import fs from 'fs-extra';

export function setupOptions(box, data, callback) {
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
