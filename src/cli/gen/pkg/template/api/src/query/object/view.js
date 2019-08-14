import { SqlBuilder } from '@scola/doc';

export function buildView() {
  const b = new SqlBuilder({
    type: 'object'
  });

  const q = b.query(
    b.select('*'),
    b.from('platform.__OBJECT_LC__'),
    b.where(
      b.eq(
        '__OBJECT_LC___id',
        (request) => request.params[1]
      )
    )
  );

  return b.build(q);
}
