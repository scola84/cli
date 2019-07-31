export function buildText(b) {
  b.text().attributes({
    name: '__COLUMN__',
    required: 'required'
  }).properties({
    value: (box, data) => data.__COLUMN__
  }).custom(
    '__CUSTOM__'
  );
}
