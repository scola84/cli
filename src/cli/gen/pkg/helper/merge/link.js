import { mergeObject } from './object';

export function mergeLink(data, result) {
  [result] = mergeObject(result);

  if (typeof result === 'undefined') {
    return data;
  }

  data.search = result.search.map((field) => {
    field.link = data.link;
    return field;
  });

  data.default = result.default.map((field) => {
    field.link = data.link;
    return field;
  });

  data.order = result.order.map((field) => {
    field.link = data.link;
    return field;
  });

  return data;
}
