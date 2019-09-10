import { SqlBuilder } from '@scola/doc'
import { ViewBuilder } from '@scola/dom'
import { buildFieldset } from '../../../cmn/view//*object*//fieldset'

export function buildEdit () {
  const sb = new SqlBuilder()
  const vb = new ViewBuilder()

  sb.build(
    sb.query(
      sb.update(
        sb.id('/*object*/')
      ),
      sb.set(
        /* #each groups */
        /* #each fields */
        sb.eq(
          sb.id('/*name*/'),
          sb.value((request, data) => {
            return data['/*name*/']
          })
        ) /* comma */
        /* /each */
        /* /each */
      ),
      sb.where(
        sb.eq(
          sb.id('/*object*/_id'),
          sb.value((request) => {
            return request.params['/*object*/_id']
          })
        )
      )
    )
  )

  vb.build(
    vb.validate(
      buildFieldset(vb)
    ).err(
      vb.throw()
    )
  )

  vb.connect(sb)

  return [vb, sb]
}
