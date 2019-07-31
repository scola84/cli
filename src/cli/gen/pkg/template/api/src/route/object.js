import { buildAdd } from '../query/__OBJECT_LC__/add';
import { buildDelete } from '../query/__OBJECT_LC__/delete';
import { buildEdit } from '../query/__OBJECT_LC__/edit';
import { buildList } from '../query/__OBJECT_LC__/list';
import { buildView } from '../query/__OBJECT_LC__/view';

export function route__OBJECT_UC__({ router, resolver }) {
  router
    .connect('GET ^/api/__OBJECT_LC__$', buildList())
    .connect(resolver);

  router
    .connect('GET ^/api/__OBJECT_LC__/(\\d+)$', buildView())
    .connect(resolver);

  router
    .connect('POST ^/api/__OBJECT_LC__$', buildAdd())
    .connect(resolver);

  router
    .connect('PUT ^/api/__OBJECT_LC__/(\\d+)$', buildEdit())
    .connect(resolver);

  router
    .connect('DELETE ^/api/__OBJECT_LC__/(\\d+)$', buildDelete())
    .connect(resolver);
}
