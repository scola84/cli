import { buildAdd } from './add';
import { buildDelete } from './delete';
import { buildEdit } from './edit';
import { buildLink } from './link';
import { buildList } from './list';
import { buildView } from './view';

export function query({ router, resolver }) {
  router
    .connect('GET ^/api//*object*/$', buildList())
    .connect(resolver);

  router
    .connect('GET ^/api//*object*//(?</*object*/_id>\\d+)$', buildView())
    .connect(resolver);

  router
    .connect('GET ^/api//*object*//(?</*object*/_id>\\d+)/link$', buildLink())
    .connect(resolver);

  router
    .connect('POST ^/api//*object*/$', buildAdd())
    .connect(resolver);

  router
    .connect('PUT ^/api//*object*//(?</*object*/_id>\\d+)$', buildEdit())
    .connect(resolver);

  router
    .connect('DELETE ^/api//*object*//(?</*object*/_id>\\d+)$', buildDelete())
    .connect(resolver);
}
