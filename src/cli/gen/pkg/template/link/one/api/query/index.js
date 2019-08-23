import { buildAdd } from './add'
import { buildDelete } from './delete'
import { buildEdit } from './edit'
import { buildList } from './list'
import { buildView } from './view'

export function _LlinkR_ ({ router, resolver }) {
  router
    .connect('GET ^/api//*object*//(?</*object*/_id>\\d+)//*link*/$', buildList())
    .connect(resolver)

  router
    .connect('GET ^/api//*object*//(?</*object*/_id>\\d+)//*link*//(?</*link*/_id>\\d+)$', buildView())
    .connect(resolver)

  router
    .connect('POST ^/api//*object*//(?</*object*/_id>\\d+)//*link*/$', buildAdd())
    .connect(resolver)

  router
    .connect('PUT ^/api//*object*//(?</*object*/_id>\\d+)//*link*//(?</*link*/_id>\\d+)$', buildEdit())
    .connect(resolver)

  router
    .connect('DELETE ^/api//*object*//(?</*object*/_id>\\d+)//*link*//(?</*link*/_id>\\d+)$', buildDelete())
    .connect(resolver)
}
