import { SqlBuilder } from '@scola/doc';

export function buildList() {
  const s = new SqlBuilder({
    type: 'list'
  });

  s.build(
    s.query(
      s.select('*'),
      s.from(
        s.id('/*table*/')
      ),
      s.left(),
      s.join(
        s.id('/*link*/')
      ),
      s.on(
        s.eq(
          s.id('/*table*/./*link*/_id'),
          s.id('/*link*/./*link*/_id')
        )
      ),
      s.where(
        s.and(
          s.eq(
            s.id('/*table*/./*object*/_id'),
            s.value((request) => {
              return request.params['/*object*/_id'];
            })
          ),
          s.search().columns(
            /* #search */
            '/*link*/./*name*/'
            /* /search */
          )
          .search((request) => {
            return request.url.query.search;
          })
        )
      ),
      s.orderBy(
        s.order().columns(
          /* #order */
          '/*link*/./*name*/'
          /* /order */
        )
        .default(
          /* #default */
          s['/*direction*/'](
            s.id('/*link*/./*name*/')
          )
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
