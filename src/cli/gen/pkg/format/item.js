import { extractBody } from './extract';

import {
  formatLabel,
  formatField,
  formatHint
} from './';

export function formatItem(column, options, hasCustom) {
  const item = extractBody(options.bdir + '/build/input/item.js');

  const label = formatLabel(column, options);
  const field = formatField(column, options, hasCustom);
  const hint = formatHint(column, options, hasCustom);

  return item
    .replace(/'__LABEL__'/g, label)
    .replace(/'__FIELD__'/g, field)
    .replace(/'__HINT__'/g, hint);
}
