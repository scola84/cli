import groupBy from 'lodash-es/groupBy';
import { mergeField } from './field';

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

    const fields = data[table]
      .filter((field) => !field.primary)
      .map((field) => mergeField(object, link, field));

    let groups = groupBy(fields, 'group');

    groups = Object.keys(groups).map((name) => {
      return {
        link,
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
      custom: [],
      default: [],
      order: [],
      search: []
    };

    definition.groups.forEach((group) => {
      group.fields.forEach((field) => {
        if (field.options.custom) {
          definition.custom.push({
            name: field.name
          });
        }

        if (field.options.default) {
          definition.default.push({
            name: field.name,
            direction: field.options.default
          });
        }

        if (field.options.order) {
          definition.order.push({
            name: field.name
          });
        }

        if (field.options.search) {
          definition.search.push({
            name: field.name
          });
        }
      });
    });

    return definition;
  });
}
