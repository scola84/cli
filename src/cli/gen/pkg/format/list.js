export function formatList(content, columns) {
  const search = [];
  const order = [];
  const def = [];

  columns.forEach((column) => {
    if (column.options.search === '') {
      search.push(column.COLUMN_NAME);
    }

    if (column.options.order === '') {
      order.push(column.COLUMN_NAME);
    }

    if (column.options.default) {
      def.push(
        column.COLUMN_NAME + ' ' + column.options.default.toUpperCase()
      );
    }
  });

  return content
    .replace(/__SEARCH_COLUMNS__/g, search.join('\',\''))
    .replace(/__ORDER_COLUMNS__/g, order.join('\',\''))
    .replace(/__ORDER_DEFAULT__/g, def.join('\',\''));
}
