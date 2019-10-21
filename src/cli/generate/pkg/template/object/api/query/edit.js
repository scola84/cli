import { SqlBuilder, HtmlBuilder } from '@scola/lib'
import { buildFieldset } from '../../../cmn/view//*object*//fieldset'

export function buildEdit () {
  const editor = new SqlBuilder({
    query (sb) {
      return sb.query(
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
    }
  })

  const validator = new HtmlBuilder({
    view (hb) {
      return hb.validate(
        buildFieldset(hb)
      ).err(
        hb.throw()
      )
    }
  })

  validator
    .connect(editor)

  return [validator, editor]
}
