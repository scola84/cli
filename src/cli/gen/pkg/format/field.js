import format from './field/';

export function formatField(column, options, hasCustom) {
  let field = null;

  Object.keys(format).forEach((key) => {
    const regexp = new RegExp(key);

    if (regexp.test(column.COLUMN_TYPE)) {
      field = format[key](column, options);
    }
  });

  const custom = hasCustom ? column.COLUMN_NAME : '() => true';

  return field
    .replace(/'__CUSTOM__'/g, custom)
    .replace(/__COLUMN__/g, column.COLUMN_NAME);
}
