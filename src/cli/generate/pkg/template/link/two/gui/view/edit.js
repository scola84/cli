import { HtmlBuilder } from '@scola/lib'
import { buildCurrent } from '../../../cmn/view//*link*//current'
import { buildFieldset } from '../../../cmn/view//*link*//fieldset'
import { buildNew } from '../../../cmn/view//*link*//new'

export function buildEdit () {
  const hb = new HtmlBuilder()

  hb.build(
    hb.panel(
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
            hb.button().form('edit').text(
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
          hb.selector('.group.new .body')
        ),
        hb.message(),
        hb.progress()
      ),
      hb.scroll(
        hb.body(
          hb.submit(
            hb.form().id('edit').append(
              hb.getObject().name('/*object*/', '/*link*/').append(
                buildFieldset(hb),
                buildCurrent(hb)
              ),
              buildNew(hb)
            )
          ).act(
            hb.validate(
              hb.selector('.body form')
            ).act(
              hb.putObject().name('/*object*/', '/*link*/')
            ).err(
              hb.selector('.body .hint')
            )
          )
        )
      ).act(
        hb.selector('.group.new .body')
      )
    )
  )

  return hb
}
