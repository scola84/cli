import { SqlBuilder } from '@scola/doc'

export function buildList () {
  const sb = new SqlBuilder({
    type: 'list'
  })

  sb.build(
    sb.query(
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
            sb.value((request) => {
              return request.params['/*object*/_id']
            })
          ),
          sb.search()
            .columns(
            /* #each search */
              '/*link*/./*name*/' /* comma */
            /* /each */
            )
            .search((request) => {
              return request.url.query.search
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
