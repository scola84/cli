import groupBy from 'lodash-es/groupBy'
import { mergeField } from './field'

export function mergeObject (box, data) {
  const tables = groupBy(data, 'table')
  const links = []

  return Object.keys(tables).map((table) => {
    let [
      object,
      link
    ] = table.split('_')

    if (link === box.name) {
      link = object
      object = box.name
    }

    let sides = 'two'

    const fields = tables[table]
      .filter((field) => {
        if (Boolean(field.primary) === true) {
          return false
        }

        if (field.name.match(/_id/) !== null) {
          sides = 'one'
          return false
        }

        return true
      })
      .map((field) => {
        return mergeField(object, link, field)
      })

    if (link !== undefined) {
      links.push({
        link,
        object,
        sides
      })
    }

    let groups = groupBy(fields, (field) => {
      return field.options.group || 'default'
    })

    groups = Object.keys(groups).map((name) => {
      return {
        fields: groups[name],
        link,
        name,
        object
      }
    })

    const definition = {
      custom: false,
      default: [],
      groups,
      link,
      links,
      name: link || object,
      object,
      order: [],
      search: [],
      sides,
      table
    }

    definition.groups.forEach((group) => {
      group.fields.forEach((field) => {
        if (field.options.default !== undefined) {
          definition.default.push({
            direction: field.options.default,
            name: field.name
          })
        }

        if (field.options.order !== undefined) {
          definition.order.push({
            name: field.name
          })
        }

        if (field.options.search !== undefined) {
          definition.search.push({
            name: field.name
          })
        }
      })
    })

    return definition
  })
}
