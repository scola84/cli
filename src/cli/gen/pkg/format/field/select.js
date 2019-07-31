import { extractBody } from '../extract';
import { formatOptions } from './option';

export function formatSelect(column, options) {
  const select = extractBody(options.bdir + '/build/input/select.js');
  const children = formatOptions(column, options);

  return select
    .replace(/'__OPTION__'/g, children.join(',\n'));
}
