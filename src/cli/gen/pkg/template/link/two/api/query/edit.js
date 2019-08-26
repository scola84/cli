import { SqlBuilder } from '@scola/doc'
import { ViewBuilder } from '@scola/dom'
import { buildFieldset } from '../../../cmn/view//*link*//fieldset'

export function buildEdit () {
  const sb = new SqlBuilder()
  const vb = new ViewBuilder()

  sb.build(
    sb.query(
      sb.update(
        sb.id('/*table*/')
      ),
      sb.set(
        /* #each groups */
        /* #each fields */
        sb.eq(
          sb.id('/*name*/'),
          sb.value((request, data) => {
            return data['/*name*/']
          })
        ),
        /* /each */
        /* /each */
        sb.eq(
          sb.id('/*link*/_id'),
          sb.value((request, data) => {
            return data['/*link*/_id']
          })
        )
      ),
      sb.where(
        sb.and(
          sb.eq(
            sb.id('/*object*/_id'),
            sb.value((request) => {
              return request.params['/*object*/_id']
            })
          ),
          sb.eq(
            sb.id('/*link*/_id'),
            sb.value((request) => {
              return request.params['/*link*/_id']
            })
          )
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
