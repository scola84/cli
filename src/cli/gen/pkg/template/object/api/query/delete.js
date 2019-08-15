import { SqlBuilder } from '@scola/doc';

export function buildDelete() {
  const s = new SqlBuilder();

  s.build(
    s.query(
      s.delete(),
      s.from(
        s.id('/*object*/')
      ),
      s.where(
        s.eq(
          s.id('/*object*/_id'),
          s.value((request) => {
            return request.params['/*object*/_id'];
          })
        )
      )
    )
  );

  return s;
}
