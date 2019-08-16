import { SqlBuilder } from '@scola/doc';
import { ViewBuilder } from '@scola/dom';
import { buildFieldset } from '../../../cmn/view//*object*//fieldset';

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
        /* #groups */
        /* #fields */
        '/*name*/'
        /*comma*/
        /* /fields */
        /* /groups */
      ).parens(),
      s.values(
        /* #groups */
        /* #fields */
        s.value((request, data) => {
          return data['/*name*/'];
        })
        /*comma*/
        /* /fields */
        /* /groups */
      )
    )
  );

  v.build(
    v.validate(
      buildFieldset(v)
    ).err(
      v.throw()
    )
  );

  v.connect(s);

  return [v, s];
}
