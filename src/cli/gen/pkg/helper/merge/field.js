import qs from 'qs';

export function mergeField(object, link, field) {
  field.link = link;
  field.object = object;

  field.group = field.group || 'default';
  field.options = qs.parse(field.options);

  field.values = (field.values || '')
    .split(',')
    .filter((v) => v)
    .map((value) => {
      return {
        link,
        object,
        value
      };
    });

  return field;
}
