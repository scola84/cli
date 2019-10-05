import { SqlBuilder } from '@scola/lib'

export function buildList () {
  const sb = new SqlBuilder({
    type: 'list'
  })

  sb.build(
    sb.query(
      sb.select('*'),
      sb.from(
        sb.id('/*object*/')
      ),
      sb.where(
        sb.search()
          .columns(
          /* #each search */
            '/*name*/' /* comma */
          /* /each */
          )
          .search((box) => {
            return box.request.url.query.search
          })
      ),
      sb.orderBy(
        sb.order()
          .columns(
          /* #each order */
            '/*name*/' /* comma */
          /* /each */
          )
          .default(
          /* #each default */
            sb['/*direction*/'](
              sb.id('/*name*/')
            ) /* comma */
          /* /each */
          )
          .order((box) => {
            return box.request.url.query.order
          })
          .by((box) => {
            return box.request.url.query.by
          })
      ),
      sb.limit(
        sb.slice()
          .offset((box) => {
            return box.request.url.query.offset
          })
          .count((box) => {
            return box.request.url.query.count
          })
      )
    )
  )

  return sb
}
