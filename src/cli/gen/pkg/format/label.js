import { extractBody } from './extract';

export function formatLabel(column, options) {
  const label = extractBody(options.bdir + '/build/input/label.js');

  return label
    .replace(/__COLUMN__/g, column.COLUMN_NAME);
}
