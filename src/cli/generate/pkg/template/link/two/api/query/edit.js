import { SqlBuilder, HtmlBuilder } from '@scola/lib'
import { buildFieldset } from '../../../cmn/view//*link*//fieldset'

export function buildEdit () {
  const editor = new SqlBuilder({
    query (sb) {
      return sb.query(
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
          ),
          /* /each */
          /* /each */
          sb.eq(
            sb.id('/*link*/_id'),
            sb.value((box, data) => {
              return data['/*link*/_id']
            })
          )
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
