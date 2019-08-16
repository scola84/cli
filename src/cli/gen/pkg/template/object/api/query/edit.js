import { SqlBuilder } from '@scola/doc';
import { ViewBuilder } from '@scola/dom';
import { buildFieldset } from '../../../cmn/view//*object*//fieldset';

export function buildEdit() {
  const s = new SqlBuilder();
  const v = new ViewBuilder();

  s.build(
    s.query(
      s.update(
        s.id('/*object*/')
      ),
      s.set(
        /* #groups */
        /* #fields */
        s.eq(
          s.id('/*name*/'),
          s.value((request, data) => {
            return data['/*name*/'];
          })
        )
        /*comma*/
        /* /fields */
        /* /groups */
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
