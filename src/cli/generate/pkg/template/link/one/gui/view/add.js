import { HtmlBuilder } from '@scola/lib'
import { buildFieldset } from '../../../cmn/view//*link*//fieldset'

export function buildAdd () {
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
            hb.button().form('add').text(
              hb.print().format('button.save')
            )
          )
        ),
        hb.message(),
        hb.progress()
      ),
      hb.body(
        hb.submit(
          hb.form().id('add').append(
            buildFieldset(hb)
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
    )
  )

  return hb
}
