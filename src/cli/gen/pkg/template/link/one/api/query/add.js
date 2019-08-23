import { SqlBuilder } from '@scola/doc'
import { ViewBuilder } from '@scola/dom'
import { buildFieldset } from '../../../cmn/view//*link*//fieldset'

export function buildAdd () {
  const s = new SqlBuilder()
  const v = new ViewBuilder()

  s.build(
    s.query(
      s.insert(),
      s.into(
        s.id('/*table*/')
      ),
      s.id(
        /* #each groups */
        /* #each fields */
        '/*name*/',
        /* /each */
        /* /each */
        '/*object*/_id'
      ).parens(),
      s.values(
        /* #each groups */
        /* #each fields */
        s.value((request, data) => {
          return data['/*name*/']
        }),
        /* /each */
        /* /each */
        s.value((request) => {
          return request.params['/*object*/_id']
        })
      )
    )
  )

  v.build(
    v.validate(
      buildFieldset(v)
    ).err(
      v.throw()
    )
  )

  v.connect(s)

  return [v, s]
}
