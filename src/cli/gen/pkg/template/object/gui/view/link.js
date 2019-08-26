import { ViewBuilder } from '@scola/dom'
import { buildAside } from '../../../cmn/view//*object*//link/aside'
import { buildLinkCore } from '../../../cmn/view//*object*//link'

export function buildLink () {
  const vb = new ViewBuilder()

  vb.build(
    vb.panel(
      vb.header(
        vb.bar(
          vb.left(
            vb.click(
              vb.button().class('icon ion-ios-arrow-back').text(
                vb.print().format('button.back')
              )
            ).act(
              vb.route().view('view-/*object*/:{/*object*/_id}@main:bwd&ltr')
            )
          ),
          vb.center(
            vb.title().text(
              vb.print().format('title.link')
            )
          )
        ),
        vb.message(),
        vb.progress()
      ),
      vb.body(
        buildLinkCore(vb),
        buildAside(vb)
      )
    )
  )

  return vb
}
