import { buildProperties } from '../properties'
import { buildActions } from './actions'

export function buildAside (hb) {
  return hb.fragment(
    hb.getObject().name('/*object*/').append(
      buildProperties(hb)
    ),
    buildActions(hb)
  )
}
