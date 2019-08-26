import { SqlBuilder } from '@scola/doc'

export function buildView () {
  const sb = new SqlBuilder({
    type: 'object'
  })

  sb.build(
    sb.query(
      sb.select('*'),
      sb.from(
        sb.id('/*object*/')
      ),
      sb.where(
        sb.eq(
          sb.id('/*object*/_id'),
          sb.value((request) => {
            return request.params['/*object*/_id']
          })
        )
      )
    )
  )

  return sb
}
