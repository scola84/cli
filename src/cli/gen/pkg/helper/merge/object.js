import groupBy from 'lodash-es/groupBy';
import qs from 'qs';

export function mergeObject(data) {
  data = groupBy(data, 'table');

  return Object.keys(data).map((table) => {
    const [object, link] = table.split('_');

    const columns = data[table].filter((column) => {
      return !column.pk;
    });

    const definition = {
      table,
      object,
      link,
      columns,
      search: [],
      default: [],
      order: []
    };

    definition.columns.forEach((column, index, all) => {
      column.comma = index < all.length - 1 ? ',' : '';
      column.options = qs.parse(column.options);

      if (column.options.default) {
        definition.default.push({
          name: column.name,
          direction: column.options.default
        });
      }

      if (column.options.order === '') {
        definition.order.push({
          name: column.name
        });
      }

      if (column.options.search === '') {
        definition.search.push({
          name: column.name
        });
      }
    });

    definition.default.forEach((column, index, all) => {
      column.comma = index < all.length - 1 ? ',' : '';
    });

    definition.order.forEach((column, index, all) => {
      column.comma = index < all.length - 1 ? ',' : '';
    });

    definition.search.forEach((column, index, all) => {
      column.comma = index < all.length - 1 ? ',' : '';
    });

    return definition;
  });
}
