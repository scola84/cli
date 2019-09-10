import { ViewBuilder } from '@scola/dom'
import { buildAside } from '../../../cmn/view//*object*//view/aside'
import { buildViewCore } from '../../../cmn/view//*object*//view'

export function buildView () {
  const vb = new ViewBuilder()

  vb.build(
    vb.panel(
      vb.header(
        vb.bar(
          vb.left(
            vb.click(
              vb.button().menu().class('icon ion-ios-arrow-back').text(
                vb.print().format('button.back')
              )
            ).act(
              vb.route().view('@main:bwd&ltr')
            )
          ),
          vb.center(
            vb.title().text(
              vb.print().format('/*object*/.title.1')
            )
          )
        ),
        vb.message(),
        vb.progress()
      ),
      vb.body(
        buildViewCore(vb),
        buildAside(vb)
      )
    )
  )

  return vb
}
