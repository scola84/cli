import { SqlBuilder } from '@scola/lib'

export function buildDelete () {
  const sb = new SqlBuilder()

  sb.build(
    sb.query(
      sb.delete(),
      sb.from(
        sb.id('/*table*/')
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

  return sb
}
