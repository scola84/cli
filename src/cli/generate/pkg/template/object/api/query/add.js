import { SqlBuilder, HtmlBuilder } from '@scola/lib'
import { buildFieldset } from '../../../cmn/view//*object*//fieldset'

export function buildAdd () {
  const sb = new SqlBuilder({
    key: '/*object*/_id',
    type: 'insert'
  })

  const hb = new HtmlBuilder()

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
        sb.value((box, data) => {
          return data['/*name*/']
        }) /* comma */
        /* /each */
        /* /each */
      )
    )
  )

  hb.build(
    hb.validate(
      buildFieldset(hb)
    ).err(
      hb.throw()
    )
  )

  hb.connect(sb)

  return [hb, sb]
}
