import { ViewBuilder } from '@scola/dom';
import { buildCurrent } from '../../../cmn/view//*link*//current';
import { buildFieldset } from '../../../cmn/view//*link*//fieldset';
import { buildNew } from '../../../cmn/view//*link*//new';

export function buildEdit() {
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
              v.print().format('/*link*/.title.1')
            )
          ),
          v.right(
            v.button().form().text(
              v.print().format('button.save')
            )
          )
        ),
        v.input(
          v.search().class('in').placeholder(
            v.print().format('search.placeholder')
          )
        ).act(
          v.selector('.search'),
          v.selector('.group.new .body')
        ),
        v.message(),
        v.progress()
      ),
      v.scroll(
        v.body(
          v.submit(
            v.form(
              v.getObject().name('/*object*/', '/*link*/').append(
                buildFieldset(v),
                buildCurrent(v)
              ),
              buildNew(v)
            )
          ).act(
            v.validate(
              v.selector('.body form')
            ).act(
              v.putObject().name('/*object*/', '/*link*/')
            ).err(
              v.selector('.body .hint')
            )
          )
        )
      ).act(
        v.selector('.group.new .body')
      )
    )
  );

  return v;
}
