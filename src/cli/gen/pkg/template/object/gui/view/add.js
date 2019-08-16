import { ViewBuilder } from '@scola/dom';
import { buildFieldset } from '../../../cmn/view//*object*//fieldset';

export function buildAdd() {
  const v = new ViewBuilder();

  v.build(
    v.panel(
      v.header(
        v.bar(
          v.left(
            v.click(
              v.button().text(
                v.print().format('button.cancel')
              )
            ).act(
              v.route().view('@self:clr')
            )
          ),
          v.center(
            v.title().text(
              v.print().format('/*object*/.title.1')
            )
          ),
          v.right(
            v.button().form().text(
              v.print().format('button.save')
            )
          )
        ),
        v.message(),
        v.progress()
      ),
      v.body(
        v.submit(
          v.form(
            buildFieldset(v)
          )
        ).act(
          v.validate(
            v.selector('.body form')
          ).act(
            v.postObject().name('/*object*/')
          ).err(
            v.selector('.body .hint')
          )
        )
      )
    )
  );

  return v;
}
