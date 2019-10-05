import { SqlBuilder, HtmlBuilder } from '@scola/lib'
import { buildFieldset } from '../../../cmn/view//*link*//fieldset'

export function buildAdd () {
  const sb = new SqlBuilder()
  const hb = new HtmlBuilder()

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
        sb.value((box, data) => {
          return data['/*name*/']
        }),
        /* /each */
        /* /each */
        sb.value((box) => {
          return box.request.params['/*object*/_id']
        })
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
