import { SqlBuilder } from '@scola/doc';

export function buildList() {
  const b = new SqlBuilder({
    type: 'list'
  });

  return b.build(
    b.query(
      b.select('*'),
      b.from('platform.__OBJECT_LC__'),
      b.where(
        b.search()
        .columns(['__SEARCH_COLUMNS__'])
        .search((request) => request.url.query.search)
      ),
      b.orderBy(
        b.order()
        .columns(['__ORDER_COLUMNS__'])
        .default('__ORDER_DEFAULT__')
        .order((request) => request.url.query.order)
        .by((request) => request.url.query.by)
      ),
      b.limit(
        b.slice()
        .offset((request) => request.url.query.offset)
        .count((request) => request.url.query.count)
      )
    )
  );
}
