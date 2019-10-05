import { HtmlBuilder } from '@scola/lib'
import { buildFieldset } from '../../../cmn/view//*object*//fieldset'

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
              hb.print().format('/*object*/.title.1')
            )
          ),
          hb.right(
            hb.button().form('edit').text(
              hb.print().format('button.save')
            )
          )
        ),
        hb.message(),
        hb.progress()
      ),
      hb.body(
        hb.submit(
          hb.form().id('edit').append(
            hb.getObject().name('/*object*/').append(
              buildFieldset(hb)
            )
          )
        ).act(
          hb.validate(
            hb.selector('.body form')
          ).act(
            hb.putObject().name('/*object*/')
          ).err(
            hb.selector('.body .hint')
          )
        ),
        hb.group(
          hb.click(
            hb.item(
              hb.button().class('delete').text(
                hb.print().format('button.delete')
              )
            )
          ).act(
            hb.deleteObject().name('/*object*/')
          )
        )
      )
    )
  )

  return hb
}
