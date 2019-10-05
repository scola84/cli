import { buildAdd } from './add'
import { buildEdit } from './edit'
import { buildList } from './list'

export function _LlinkR_ ({ main, pop }) {
  main.connect('list-/*object*/-/*link*/', buildList())
  pop.connect('add-/*object*/-/*link*/', buildAdd())
  pop.connect('edit-/*object*/-/*link*/', buildEdit())
}
