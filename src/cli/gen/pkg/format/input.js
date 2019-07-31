import groupBy from 'lodash-es/groupBy';
import { formatGroup } from './';

export function formatInput(content, columns, options) {
  const custom = [];
  const group = [];

  columns = groupBy(columns, (column) => {
    return column.options.group || 'default';
  });

  let c = null;
  let g = null;

  Object.keys(columns).forEach((title) => {
    [c, g] = formatGroup(title, columns[title], options);

    if (c) {
      custom.push(c);
    }

    if (g) {
      group.push(g);
    }
  });

  return content
    .replace(/'__CUSTOM__';/g, custom.join(',\n'))
    .replace(/'__GROUP__'/g, group.join(',\n'));
}
