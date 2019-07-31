import { extractBody } from './extract';

export function formatHint(column, options, hasCustom) {
  const hint = extractBody(options.bdir + '/build/input/hint.js');

  const format = hasCustom ?
    `'${options.object}.hint.${column.COLUMN_NAME}'` :
    null;

  return hint
    .replace(/'__FORMAT__'/g, format);
}
