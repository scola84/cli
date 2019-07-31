import { ViewBuilder } from '@scola/dom';
import { buildInputForm } from '../../../../cmn';

export function buildEdit() {
  const b = new ViewBuilder();

  const p = b.panel(
    b.request().resource('/api/__OBJECT_LC__').object().indicator(
      b.selector('.progress')
    ).act(
      b.selector('.header'),
      b.selector('.body')
    ).err(
      b.selector('.message')
    ).append(
      b.header(
        b.bar(
          b.left(
            b.click(
              b.button().text(
                b.print().format('button.cancel')
              )
            ).act(
              b.route().view('@self:clr'),
              b.route().view('view-__OBJECT_LC__@main:bwd').object()
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
            b.request().resource('PUT /api/__OBJECT_LC__').object().act(
              b.route().view('@self:clr'),
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
        ),
        b.form(
          b.group(
            b.click(
              b.item(
                b.button().class('delete').text(
                  b.print().format('button.delete')
                )
              )
            ).act(
              b.request().resource('DELETE /api/__OBJECT_LC__').object().act(
                b.route().view('@self:clr'),
                b.route().view('void-__OBJECT_LC__@main:clr')
              ).err(
                b.selector('.message')
              ).indicator(
                b.selector('.progress')
              )
            )
          )
        )
      )
    )
  );

  return b.build(p);
}
