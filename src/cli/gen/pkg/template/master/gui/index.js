import '../cmn/locale'
import * as view from './view'

export function setup (router, resolver) {
  Object.keys(view).forEach((name) => {
    view[name](router, resolver)
  })
}
