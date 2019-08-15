import { SqlBuilder } from '@scola/doc';
import { ViewBuilder } from '@scola/dom';
import { buildInput } from '../../../cmn/view//*link*//input';

export function buildAdd() {
  const s = new SqlBuilder();
  const v = new ViewBuilder();

  s.build(
    s.query(
      s.insert(),
      s.into(
        s.id('/*table*/')
      ),
      s.id(
        '/*object*/_id',
        '/*link*/_id'
        /* #columns */
        ,
        '/*name*/'
        /* /columns */
      ).parens(),
      s.values(
        s.value((request) => {
          return request.params['/*object*/_id'];
        }),
        s.value((request, data) => {
          return data['/*link*/_id'];
        })
        /*#columns*/
        ,
        s.value((request, data) => {
          return data['/*name*/'];
        })
        /*/columns*/
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
