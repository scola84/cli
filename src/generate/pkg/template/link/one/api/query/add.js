import { SqlBuilder } from '@scola/doc'
import { ViewBuilder } from '@scola/dom'
import { buildFieldset } from '../../../cmn/view//*link*//fieldset'

export function buildAdd () {
  const sb = new SqlBuilder()
  const vb = new ViewBuilder()

  sb.build(
    sb.query(
      sb.insert(),
      sb.into(
        sb.id('/*table*/')
      ),
      sb.id(
        /* #each groups */
        /* #each fields */
        '/*name*/',
        /* /each */
        /* /each */
        '/*object*/_id'
      ).parens(),
      sb.values(
        /* #each groups */
        /* #each fields */
        sb.value((request, data) => {
          return data['/*name*/']
        }),
        /* /each */
        /* /each */
        sb.value((request) => {
          return request.params['/*object*/_id']
        })
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
