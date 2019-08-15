import { SqlBuilder } from '@scola/doc';
import { ViewBuilder } from '@scola/dom';
import { buildInput } from '../../../cmn/view//*object*//input';

export function buildAdd() {
  const s = new SqlBuilder({
    key: '/*object*/_id',
    type: 'insert'
  });

  const v = new ViewBuilder();

  s.build(
    s.query(
      s.insert(),
      s.into(
        s.id('/*object*/')
      ),
      s.id(
        /* #columns */
        '/*name*/'
        /*comma*/
        /* /columns */
      ).parens(),
      s.values(
        /* #columns */
        s.value((request, data) => {
          return data['/*name*/'];
        })
        /*comma*/
        /* /columns */
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
