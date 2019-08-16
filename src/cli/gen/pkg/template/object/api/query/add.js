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
        /*#each groups*/
        /*#each fields*/
        '/*name*/'
        /*comma*/
        /*/each*/
        /*/each*/
      ).parens(),
      s.values(
        /*#each groups*/
        /*#each fields*/
        s.value((request, data) => {
          return data['/*name*/'];
        })
        /*comma*/
        /*/each*/
        /*/each*/
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
