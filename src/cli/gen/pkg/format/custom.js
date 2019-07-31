export function formatCustom(column, options) {
  return `import { ${column.COLUMN_NAME} }` +
    ` from '../../input/${options.object}/${column.COLUMN_NAME}';`;
}
