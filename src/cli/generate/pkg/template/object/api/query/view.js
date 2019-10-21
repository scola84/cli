import { SqlBuilder } from '@scola/lib'

export function buildView () {
  const viewer = new SqlBuilder({
    type: 'object',
    query (sb) {
      return sb.query(
        sb.select('*'),
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
    }
  })

  return viewer
}
