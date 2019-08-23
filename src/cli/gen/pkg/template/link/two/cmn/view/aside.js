import { buildProperties } from '..//*object*//properties'
import { buildActions } from './actions'

export function buildAside (v) {
  return v.fragment(
    v.getObject().name('/*object*/').append(
      buildProperties(v)
    ),
    buildActions(v)
  )
}
