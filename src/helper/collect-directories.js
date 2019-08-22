import XRegExp from 'xregexp';
import { readFileSync, readdirSync } from 'fs';
import { createFilter } from './create-filter';

export function collectDirectories(filter, recursive) {
  if (filter && filter[0] === '@') {
    return collectFromFile(filter);
  }

  if (recursive === true) {
    return collectFromDir(filter);
  }

  return [process.cwd()];
}

function collectFromFile(filter) {
  const splitter = new XRegExp('(?<!\\\\)@');
  const [, file, regexp = '.*'] = filter.split(splitter);

  const data = String(readFileSync(file));
  let list = data.trim().split('\n\n');

  list = list.filter((item) => {
    item = item.split('\n').slice(1).join('\n');
    return item.match(new XRegExp(regexp)) !== null;
  });

  list = list.map((item) => {
    item = item.match('(.+)\\$');
    return item && item[1];
  });

  return list;
}

function collectFromDir(filter) {
  const cwd = process.cwd();
  const regexp = createFilter(filter);

  return readdirSync(cwd).filter((item) => {
    return item.match(regexp) !== null;
  }).map((item) => {
    return cwd + '/' + item;
  });
}
