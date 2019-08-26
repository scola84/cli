import { buildProperties } from '..//*object*//properties'
import { buildActions } from './actions'

export function buildAside (vb) {
  return vb.fragment(
    vb.getObject().name('/*object*/').append(
      buildProperties(vb)
    ),
    buildActions(vb)
  )
}
