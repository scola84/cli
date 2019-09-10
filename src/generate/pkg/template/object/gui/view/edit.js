import { ViewBuilder } from '@scola/dom'
import { buildFieldset } from '../../../cmn/view//*object*//fieldset'

export function buildEdit () {
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
              vb.print().format('/*object*/.title.1')
            )
          ),
          vb.right(
            vb.button().form('edit').text(
              vb.print().format('button.save')
            )
          )
        ),
        vb.message(),
        vb.progress()
      ),
      vb.body(
        vb.submit(
          vb.form().id('edit').append(
            vb.getObject().name('/*object*/').append(
              buildFieldset(vb)
            )
          )
        ).act(
          vb.validate(
            vb.selector('.body form')
          ).act(
            vb.putObject().name('/*object*/')
          ).err(
            vb.selector('.body .hint')
          )
        ),
        vb.group(
          vb.click(
            vb.item(
              vb.button().class('delete').text(
                vb.print().format('button.delete')
              )
            )
          ).act(
            vb.deleteObject().name('/*object*/')
          )
        )
      )
    )
  )

  return vb
}
