import groupBy from 'lodash-es/groupBy';
import { mergeField } from './field';

export function mergeObject(data) {
  data = groupBy(data, 'table');
  const links = [];

  return Object.keys(data).map((table) => {
    const [
      object,
      link
    ] = table.split('_');

    let child = false;

    const fields = data[table]
      .filter((field) => {
        if (field.primary) {
          return false;
        }

        if (field.name.match(/_id/)) {
          child = true;
          return false;
        }

        return true;
      })
      .map((field) => {
        return mergeField(object, link, field);
      });

    if (link) {
      links.push({
        child,
        link,
        object
      });
    }

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
      child: null,
      custom: false,
      name: link || object,
      default: [],
      order: [],
      search: []
    };

    definition.groups.forEach((group) => {
      group.fields.forEach((field) => {
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
