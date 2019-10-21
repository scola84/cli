import { SqlBuilder, HtmlBuilder } from '@scola/lib'
import { buildFieldset } from '../../../cmn/view//*object*//fieldset'

export function buildAdd () {
  const adder = new SqlBuilder({
    key: '/*object*/_id',
    type: 'insert',
    query (sb) {
      return sb.query(
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
