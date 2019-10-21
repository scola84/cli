import { HtmlBuilder } from '@scola/lib'
import { buildFieldset } from '../../../cmn/view//*link*//fieldset'
import { buildNew } from '../../../cmn/view//*link*//new'

export function buildAdd () {
  const adder = new HtmlBuilder({
    view (hb) {
      return hb.panel(
        hb.header(
          hb.bar(
            hb.left(
              hb.click(
                hb.button().text(
                  hb.print().format('button.cancel')
                )
              ).act(
                hb.route().view('@self:clr')
              )
            ),
            hb.center(
              hb.title().text(
                hb.print().format('/*object*/.link./*link*/.title.1')
              )
            ),
            hb.right(
              hb.button().form('add').text(
                hb.print().format('button.save')
              )
            )
          ),
          hb.input(
            hb.search().class('in').placeholder(
              hb.print().format('search.placeholder')
            )
          ).act(
            hb.selector('.search'),
            hb.selector('.new .body')
          ),
          hb.message(),
          hb.progress()
        ),
        hb.scroll(
          hb.body(
            hb.submit(
              hb.form().id('add').append(
                buildFieldset(hb),
                buildNew(hb)
              )
            ).act(
              hb.validate(
                hb.selector('.body form')
              ).act(
                hb.postObject().name('/*object*/', '/*link*/')
              ).err(
                hb.selector('.body .hint')
              )
            )
          )
        ).act(
          hb.selector('.new .body')
        )
      )
    }
  })

  return adder
}
