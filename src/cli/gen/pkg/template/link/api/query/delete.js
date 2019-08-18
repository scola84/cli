import { SqlBuilder } from '@scola/doc';

export function buildDelete() {
  const s = new SqlBuilder();

  s.build(
    s.query(
      s.delete(),
      s.from(
        s.id('/*table*/')
      ),
      s.where(
        s.and(
          s.eq(
            s.id('/*object*/_id'),
            s.value((request) => {
              return request.params['/*object*/_id'];
            })
          ),
          s.eq(
            s.id('/*link*/_id'),
            s.value((request) => {
              return request.params['/*link*/_id'];
            })
          )
        )
      )
    )
  );

  return s;
}
