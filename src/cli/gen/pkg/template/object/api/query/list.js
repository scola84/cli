import { SqlBuilder } from '@scola/doc'

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
          .search((request) => {
            return request.url.query.search
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
          .order((request) => {
            return request.url.query.order
          })
          .by((request) => {
            return request.url.query.by
          })
      ),
      sb.limit(
        sb.slice()
          .offset((request) => {
            return request.url.query.offset
          })
          .count((request) => {
            return request.url.query.count
          })
      )
    )
  )

  return sb
}
