import { SqlBuilder, HtmlBuilder } from '@scola/lib'
import { buildFieldset } from '../../../cmn/view//*link*//fieldset'

export function buildAdd () {
  const adder = new SqlBuilder({
    query (sb) {
      return sb.query(
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
          '/*object*/_id',
          '/*link*/_id'
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
          }),
          sb.value((box, data) => {
            return data['/*link*/_id']
          })
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
    .connect(adder)

  return [validator, adder]
}
