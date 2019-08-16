import { mergeObject } from './object';

export function mergeLink(data, result) {
  [result] = mergeObject(result);

  data.search = result.search.map((column) => {
    column.link = data.link;
    return column;
  });

  data.default = result.default.map((column) => {
    column.link = data.link;
    return column;
  });

  data.order = result.order.map((column) => {
    column.link = data.link;
    return column;
  });

  return data;
}
