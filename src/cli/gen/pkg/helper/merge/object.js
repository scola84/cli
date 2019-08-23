import groupBy from 'lodash-es/groupBy'
import { mergeField } from './field'

export function mergeObject (box, data) {
  data = groupBy(data, 'table')
  const links = []

  return Object.keys(data).map((table) => {
    let [
      object,
      link
    ] = table.split('_')

    if (link === box.object) {
      link = object
      object = box.object
    }

    let sides = 'two'

    const fields = data[table]
      .filter((field) => {
        if (field.primary) {
          return false
        }

        if (field.name.match(/_id/)) {
          sides = 'one'
          return false
        }

        return true
      })
      .map((field) => {
        return mergeField(object, link, field)
      })

    if (link) {
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
        if (field.options.default) {
          definition.default.push({
            direction: field.options.default,
            name: field.name
          })
        }

        if (field.options.order) {
          definition.order.push({
            name: field.name
          })
        }

        if (field.options.search) {
          definition.search.push({
            name: field.name
          })
        }
      })
    })

    return definition
  })
}
