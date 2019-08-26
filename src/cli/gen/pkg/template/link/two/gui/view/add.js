import { ViewBuilder } from '@scola/dom'
import { buildFieldset } from '../../../cmn/view//*link*//fieldset'
import { buildNew } from '../../../cmn/view//*link*//new'

export function buildAdd () {
  const vb = new ViewBuilder()

  vb.build(
    vb.panel(
      vb.header(
        vb.bar(
          vb.left(
            vb.click(
              vb.button().text(
                vb.print().format('button.cancel')
              )
            ).act(
              vb.route().view('@self:clr')
            )
          ),
          vb.center(
            vb.title().text(
              vb.print().format('/*object*/.link./*link*/.title.1')
            )
          ),
          vb.right(
            vb.button().form('add').text(
              vb.print().format('button.save')
            )
          )
        ),
        vb.input(
          vb.search().class('in').placeholder(
            vb.print().format('search.placeholder')
          )
        ).act(
          vb.selector('.search'),
          vb.selector('.new .body')
        ),
        vb.message(),
        vb.progress()
      ),
      vb.scroll(
        vb.body(
          vb.submit(
            vb.form().id('add').append(
              buildFieldset(vb),
              buildNew(vb)
            )
          ).act(
            vb.validate(
              vb.selector('.body form')
            ).act(
              vb.postObject().name('/*object*/', '/*link*/')
            ).err(
              vb.selector('.body .hint')
            )
          )
        )
      ).act(
        vb.selector('.new .body')
      )
    )
  )

  return vb
}
