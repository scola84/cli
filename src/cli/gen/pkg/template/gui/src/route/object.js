import { buildAdd } from '../view/__OBJECT_LC__/add';
import { buildEdit } from '../view/__OBJECT_LC__/edit';
import { buildList } from '../view/__OBJECT_LC__/list';
import { buildVoid } from '../view/__OBJECT_LC__/void';
import { buildView } from '../view/__OBJECT_LC__/view';

export function route__OBJECT_UC__({ main, menu, pop }) {
  main.connect('view-__OBJECT_LC__', buildView());
  main.connect('void-__OBJECT_LC__', buildVoid());
  menu.connect('list-__OBJECT_LC__', buildList());
  pop.connect('add-__OBJECT_LC__', buildAdd());
  pop.connect('edit-__OBJECT_LC__', buildEdit());
}
