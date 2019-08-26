import { SqlBuilder } from '@scola/doc'

export function buildDelete () {
  const sb = new SqlBuilder()

  sb.build(
    sb.query(
      sb.delete(),
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
