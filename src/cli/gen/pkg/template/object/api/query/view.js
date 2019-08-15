import { SqlBuilder } from '@scola/doc';

export function buildView() {
  const s = new SqlBuilder({
    type: 'object'
  });

  s.build(
    s.query(
      s.select('*'),
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
