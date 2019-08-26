import { SqlBuilder } from '@scola/doc'
import { ViewBuilder } from '@scola/dom'
import { buildFieldset } from '../../../cmn/view//*object*//fieldset'

export function buildAdd () {
  const sb = new SqlBuilder({
    key: '/*object*/_id',
    type: 'insert'
  })

  const vb = new ViewBuilder()

  sb.build(
    sb.query(
      sb.insert(),
      sb.into(
        sb.id('/*object*/')
      ),
      sb.id(
        /* #each groups */
        /* #each fields */
        '/*name*/' /* comma */
        /* /each */
        /* /each */
      ).parens(),
      sb.values(
        /* #each groups */
        /* #each fields */
        sb.value((request, data) => {
          return data['/*name*/']
        }) /* comma */
        /* /each */
        /* /each */
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
