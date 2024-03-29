import { SqlBuilder } from '@scola/lib'

export function buildView () {
  const viewer = new SqlBuilder({
    type: 'object',
    query (sb) {
      return sb.query(
        sb.select('*'),
        sb.from(
          sb.id('/*table*/')
        ),
        sb.where(
          sb.and(
            sb.eq(
              sb.id('/*table*/./*object*/_id'),
              sb.value((box) => {
                return box.request.params['/*object*/_id']
              })
            ),
            sb.eq(
              sb.id('/*table*/./*link*/_id'),
              sb.value((box) => {
                return box.request.params['/*link*/_id']
              })
            )
          )
        )
      )
    }
  })

  return viewer
}
