import { MysqlBuilder } from '@scola/doc';
import { ViewBuilder } from '@scola/dom';
import { buildInputForm } from '../../../../cmn';

export function buildAdd() {
  const b = new MysqlBuilder({
    key: '__OBJECT_LC___id',
    type: 'insert'
  });

  const v = new ViewBuilder();

  b.build(
    b.query(
      b.insert(),
      b.into('platform.__OBJECT_LC__'),
      b.set(
        b.eq(
          'serial_number',
          b.string((request, data) => data.serial_number)
        )
      )
    )
  );

  v.build(
    v.validate(
      buildInputForm(v)
    ).err(
      v.throw()
    )
  );

  v.connect(b);

  return [v, b];
}
