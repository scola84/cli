import { SqlBuilder } from '@scola/doc';

export function buildList() {
  const s = new SqlBuilder({
    type: 'list'
  });

  s.build(
    s.query(
      s.select('*'),
      s.from(
        s.id('/*object*/')
      ),
      s.where(
        s.search().columns(
          /* #search */
          '/*name*/'
          /*comma*/
          /* /search */
        )
        .search((request) => {
          return request.url.query.search;
        })
      ),
      s.orderBy(
        s.order().columns(
          /* #order */
          '/*name*/'
          /*comma*/
          /* /order */
        )
        .default(
          /* #default */
          s['/*direction*/'](
            s.id('/*name*/')
          )
          /*comma*/
          /* /default */
        )
        .order((request) => {
          return request.url.query.order;
        })
        .by((request) => {
          return request.url.query.by;
        })
      ),
      s.limit(
        s.slice().offset((request) => {
          return request.url.query.offset;
        })
        .count((request) => {
          return request.url.query.count;
        })
      )
    )
  );

  return s;
}
