import { SqlBuilder, HtmlBuilder } from '@scola/lib'
import { buildFieldset } from '../../../cmn/view//*link*//fieldset'

export function buildEdit () {
  const sb = new SqlBuilder()
  const hb = new HtmlBuilder()

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
          sb.value((box, data) => {
            return data['/*name*/']
          })
        ) /* comma */
        /* /each */
        /* /each */
      ),
      sb.where(
        sb.and(
          sb.eq(
            sb.id('/*object*/_id'),
            sb.value((box) => {
              return box.request.params['/*object*/_id']
            })
          ),
          sb.eq(
            sb.id('/*link*/_id'),
            sb.value((box) => {
              return box.request.params['/*link*/_id']
            })
          )
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
