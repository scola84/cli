import { SqlBuilder } from '@scola/doc';
import { ViewBuilder } from '@scola/dom';
import { buildInput } from '../../../cmn/view//*link*//input';

export function buildEdit() {
  const s = new SqlBuilder();
  const v = new ViewBuilder();

  s.build(
    s.query(
      s.update(
        s.id('/*table*/')
      ),
      s.set(
        s.eq(
          s.id('/*link*/_id'),
          s.value((request, data) => {
            return data['/*link*/_id'];
          })
        )
        /* #columns */
        ,
        s.eq(
          s.id('/*name*/'),
          s.value((request, data) => {
            return data['/*name*/'];
          })
        )
        /* /columns */
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

  v.build(
    v.validate(
      buildInput(v)
    ).err(
      v.throw()
    )
  );

  v.connect(s);

  return [v, s];
}
