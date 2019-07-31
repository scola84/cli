import { extractBody } from '../extract';

export function formatOptions(column, options) {
  const option = extractBody(options.bdir + '/build/input/option.js');

  return column.COLUMN_TYPE.slice(5, -1).split(',').map((value) => {
    return option.replace(/__VALUE__/g, value.slice(1, -1));
  });
}
