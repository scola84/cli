import { MysqlBuilder } from '@scola/doc';
import { ViewBuilder } from '@scola/dom';
import { buildInputForm } from '../../../../cmn';

export function buildEdit() {
  const b = new MysqlBuilder();
  const v = new ViewBuilder();

  b.build(
    b.query(
      b.update('platform.__OBJECT_LC__'),
      b.set(
        b.eq(
          'serial_number',
          b.string((request, data) => data.serial_number)
        )
      ),
      b.where(
        b.eq(
          '__OBJECT_LC___id',
          (request) => request.params[1]
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
