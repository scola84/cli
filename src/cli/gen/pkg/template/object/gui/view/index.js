import { buildAdd } from './add'
import { buildEdit } from './edit'
import { buildLink } from './link'
import { buildList } from './list'
import { buildView } from './view'

export function _LobjectR_ ({ main, menu, pop }) {
  main.connect('link-/*object*/', buildLink())
  main.connect('view-/*object*/', buildView())
  menu.connect('list-/*object*/', buildList())
  pop.connect('add-/*object*/', buildAdd())
  pop.connect('edit-/*object*/', buildEdit())
}
