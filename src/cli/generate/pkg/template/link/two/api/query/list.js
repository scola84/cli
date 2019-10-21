import { SqlBuilder } from '@scola/lib'

export function buildList () {
  const lister = new SqlBuilder({
    type: 'list',
    query (sb) {
      return sb.query(
        sb.select('*'),
        sb.from(
          sb.id('/*table*/')
        ),
        sb.left(),
        sb.join(
          sb.id('/*link*/')
        ),
        sb.on(
          sb.eq(
            sb.id('/*table*/./*link*/_id'),
            sb.id('/*link*/./*link*/_id')
          )
        ),
        sb.where(
          sb.and(
            sb.eq(
              sb.id('/*table*/./*object*/_id'),
              sb.value((box) => {
                return box.request.params['/*object*/_id']
              })
            ),
            sb.search()
              .columns(
              /* #each search */
                '/*link*/./*name*/' /* comma */
              /* /each */
              )
              .search((box) => {
                return box.request.url.query.search
              })
          )
        ),
        sb.orderBy(
          sb.order()
            .columns(
            /* #each order */
              '/*link*/./*name*/' /* comma */
            /* /each */
            )
            .default(
            /* #each default */
              sb['/*direction*/'](
                sb.id('/*link*/./*name*/')
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
    }
  })

  return lister
}
