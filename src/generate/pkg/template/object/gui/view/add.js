import { ViewBuilder } from '@scola/dom'
import { buildFieldset } from '../../../cmn/view//*object*//fieldset'

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
              vb.print().format('/*object*/.title.1')
            )
          ),
          vb.right(
            vb.button().form('add').text(
              vb.print().format('button.save')
            )
          )
        ),
        vb.message(),
        vb.progress()
      ),
      vb.body(
        vb.submit(
          vb.form().id('add').append(
            buildFieldset(vb)
          )
        ).act(
          vb.validate(
            vb.selector('.body form')
          ).act(
            vb.postObject().name('/*object*/')
          ).err(
            vb.selector('.body .hint')
          )
        )
      )
    )
  )

  return vb
}
