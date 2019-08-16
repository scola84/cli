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
          /*#each search*/
          '/*name*/'
          /*comma*/
          /*/each*/
        )
        .search((request) => {
          return request.url.query.search;
        })
      ),
      s.orderBy(
        s.order().columns(
          /*#each order*/
          '/*name*/'
          /*comma*/
          /*/each*/
        )
        .default(
          /*#each default*/
          s['/*direction*/'](
            s.id('/*name*/')
          )
          /*comma*/
          /*/each*/
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
