import { SqlBuilder } from '@scola/lib'

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
          sb.value((box) => {
            return box.request.params['/*object*/_id']
          })
        )
      )
    )
  )

  return sb
}
