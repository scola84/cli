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
            /*#each search*/
            '/*link*/./*name*/'
            /*comma*/
            /*/each*/
          )
          .search((request) => {
            return request.url.query.search;
          })
        )
      ),
      s.orderBy(
        s.order().columns(
          /*#each order*/
          '/*link*/./*name*/'
          /*comma*/
          /*/each*/
        )
        .default(
          /*#each default*/
          s['/*direction*/'](
            s.id('/*link*/./*name*/')
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
