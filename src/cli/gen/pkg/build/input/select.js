export function buildSelect(b) {
  b.select().attributes({
    name: '__COLUMN__',
    required: 'required'
  }).properties({
    value: (box, data) => data.__COLUMN__
  }).append(
    '__OPTION__'
  ).custom(
    '__CUSTOM__'
  );
}
