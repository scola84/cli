import { buildAdd } from './add';
import { buildEdit } from './edit';
import { buildList } from './list';

export function _L_link_R_({ main, pop }) {
  main.connect('list-/*object*/-/*link*/', buildList());
  pop.connect('add-/*object*/-/*link*/', buildAdd());
  pop.connect('edit-/*object*/-/*link*/', buildEdit());
}
