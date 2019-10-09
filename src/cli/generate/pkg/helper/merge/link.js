import { mergeObject } from './object'

export function mergeLink (box, data, result) {
  const [object] = mergeObject(box, result)

  if (object === undefined) {
    return data
  }

  data.search = object.search.map((field) => {
    field.link = data.link
    return field
  })

  data.default = object.default.map((field) => {
    field.link = data.link
    return field
  })

  data.order = object.order.map((field) => {
    field.link = data.link
    return field
  })

  return data
}
