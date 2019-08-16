import { buildAdd } from './add';
import { buildEdit } from './edit';
import { buildLink } from './link';
import { buildList } from './list';
import { buildView } from './view';

export function inverter({ main, menu, pop }) {
  main.connect('link-inverter', buildLink());
  main.connect('view-inverter', buildView());
  menu.connect('list-inverter', buildList());
  pop.connect('add-inverter', buildAdd());
  pop.connect('edit-inverter', buildEdit());
}
