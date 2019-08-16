import groupBy from 'lodash-es/groupBy';
import qs from 'qs';

export function mergeObject(data) {
  data = groupBy(data, 'table');
  const links = [];

  return Object.keys(data).map((table) => {
    const [object, link] = table.split('_');

    if (link) {
      links.push({
        link,
        object
      });
    }

    const fields = data[table].filter((field) => {
      field.options = qs.parse(field.options);
      field.group = field.group || 'default';
      return !field.primary;
    });

    let groups = groupBy(fields, 'group');

    groups = Object.keys(groups).map((name) => {
      return {
        name,
        object,
        fields: groups[name]
      };
    });

    const definition = {
      groups,
      link,
      links,
      object,
      table,
      name: link || object,
      default: [],
      order: [],
      search: []
    };

    definition.groups.forEach((group, gindex, gall) => {
      group.fields.forEach((field, findex, fall) => {
        field.comma = (
          gindex === gall.length - 1 &&
          findex === fall.length - 1
        ) ? '' : ',';

        if (field.options.default) {
          definition.default.push({
            name: field.name,
            direction: field.options.default
          });
        }

        if (field.options.order === '') {
          definition.order.push({
            name: field.name
          });
        }

        if (field.options.search === '') {
          definition.search.push({
            name: field.name
          });
        }
      });
    });

    definition.default.forEach((column, index, all) => {
      column.comma = index === all.length - 1 ? '' : ',';
    });

    definition.order.forEach((column, index, all) => {
      column.comma = index === all.length - 1 ? '' : ',';
    });

    definition.search.forEach((column, index, all) => {
      column.comma = index === all.length - 1 ? '' : ',';
    });

    return definition;
  });
}
