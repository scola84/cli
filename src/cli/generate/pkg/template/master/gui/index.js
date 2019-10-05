import '../cmn/locale'
import * as view from './view'

export function setup (workers) {
  Object.keys(view).forEach((name) => {
    view[name](workers)
  })
}
