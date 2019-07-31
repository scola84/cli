import { ViewBuilder } from '@scola/dom';
import { buildInputForm } from '../../../../cmn';

export function buildAdd() {
  const b = new ViewBuilder();

  const p = b.panel(
    b.header(
      b.bar(
        b.left(
          b.click(
            b.button().text(
              b.print().format('button.cancel')
            )
          ).act(
            b.route().view('@self:clr')
          )
        ),
        b.center(
          b.title().text(
            b.print().format('__OBJECT_LC__.title.1')
          )
        ),
        b.right(
          b.button().form().attributes({
            form: '__OBJECT_LC__'
          }).text(
            b.print().format('button.save')
          )
        )
      ),
      b.message(),
      b.progress()
    ),
    b.body(
      b.submit(
        buildInputForm(b)
      ).act(
        b.validate(
          b.selector('.body form')
        ).act(
          b.request().resource('POST /api/__OBJECT_LC__').act(
            b.route().view('@self:clr').object(),
            b.route().view('view-__OBJECT_LC__@main:bwd').object()
          ).err(
            b.selector('.message'),
            b.selector('.body .hint')
          ).indicator(
            b.selector('.progress')
          )
        ).err(
          b.selector('.body .hint')
        )
      )
    )
  );

  return b.build(p);
}
