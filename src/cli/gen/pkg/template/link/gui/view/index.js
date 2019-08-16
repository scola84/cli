import { buildAdd } from './add';
import { buildEdit } from './edit';
import { buildList } from './list';

export function user({ main, pop }) {
  main.connect('list-inverter-user', buildList());
  pop.connect('add-inverter-user', buildAdd());
  pop.connect('edit-inverter-user', buildEdit());
}
