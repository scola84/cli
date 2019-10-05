import '../cmn/locale'
import * as query from './query'

export function setup (workers) {
  Object.keys(query).forEach((name) => {
    query[name](workers)
  })
}
