import { SqlBuilder } from '@scola/doc';

export function buildDelete() {
  const b = new SqlBuilder();

  b.build(
    b.query(
      b.delete(
        'i'
      ),
      b.from(
        b.as('platform.__OBJECT_LC__', 'i')
      ),
      b.where(
        b.eq(
          '__OBJECT_LC___id',
          (request) => request.params[1]
        )
      )
    )
  );

  return b;
}
