import { buildAdd } from './add'
import { buildDelete } from './delete'
import { buildEdit } from './edit'
import { buildList } from './list'
import { buildView } from './view'

export function _LlinkR_ ({ router, responder }) {
  router
    .connect('GET ^/api//*object*//(?</*object*/_id>\\d+)//*link*/$', buildList())
    .connect(responder)

  router
    .connect('GET ^/api//*object*//(?</*object*/_id>\\d+)//*link*//(?</*link*/_id>\\d+)$', buildView())
    .connect(responder)

  router
    .connect('POST ^/api//*object*//(?</*object*/_id>\\d+)//*link*/$', buildAdd())
    .connect(responder)

  router
    .connect('PUT ^/api//*object*//(?</*object*/_id>\\d+)//*link*//(?</*link*/_id>\\d+)$', buildEdit())
    .connect(responder)

  router
    .connect('DELETE ^/api//*object*//(?</*object*/_id>\\d+)//*link*//(?</*link*/_id>\\d+)$', buildDelete())
    .connect(responder)
}
