import { SqlBuilder } from '@scola/doc'

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
            sb.value((request) => {
              return request.params['/*object*/_id']
            })
          ),
          sb.eq(
            sb.id('/*link*/_id'),
            sb.value((request) => {
              return request.params['/*link*/_id']
            })
          )
        )
      )
    )
  )

  return sb
}
