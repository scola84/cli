import { SqlBuilder, HtmlBuilder } from '@scola/lib'
import { buildFieldset } from '../../../cmn/view//*object*//fieldset'

export function buildEdit () {
  const sb = new SqlBuilder()
  const hb = new HtmlBuilder()

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
          sb.value((box, data) => {
            return data['/*name*/']
          })
        ) /* comma */
        /* /each */
        /* /each */
      ),
      sb.where(
        sb.eq(
          sb.id('/*object*/_id'),
          sb.value((box) => {
            return box.request.params['/*object*/_id']
          })
        )
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
