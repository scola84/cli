import fs from 'fs-extra';
import { extractBody } from './extract';

import {
  formatCustom,
  formatItem
} from './';

export function formatGroup(title, columns, options) {
  const group = extractBody(options.bdir + '/build/input/group.js');

  const custom = [];
  const input = [];

  let customFile = null;

  columns.forEach((column) => {
    if (column.COLUMN_KEY === 'PRI') {
      return;
    }

    try {
      customFile = fs.readFileSync(
        options.tdir +
        `/cmn/src/input/${options.object}/${column.COLUMN_NAME}.js`
      );

      custom.push(formatCustom(column, options));
    } catch (e) {
      customFile = null;
    }

    input.push(formatItem(column, options, customFile !== null));
  });

  if (input.length === 0) {
    return [];
  }

  const c = custom.join(',\n');

  const g = group
    .replace('__TITLE__', title)
    .replace(/'__INPUT__'/, input.join(',\n'));

  return [c, g];
}
