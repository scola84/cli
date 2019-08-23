import { ViewBuilder } from '@scola/dom'
import { buildAside } from '../../../cmn/view//*object*//view/aside'
import { buildViewCore } from '../../../cmn/view//*object*//view'

export function buildView () {
  const v = new ViewBuilder()

  v.build(
    v.panel(
      v.header(
        v.bar(
          v.left(
            v.click(
              v.button().menu().class('icon ion-ios-arrow-back').text(
                v.print().format('button.back')
              )
            ).act(
              v.route().view('@main:bwd&ltr')
            )
          ),
          v.center(
            v.title().text(
              v.print().format('/*object*/.title.1')
            )
          )
        ),
        v.message(),
        v.progress()
      ),
      v.body(
        buildViewCore(v),
        buildAside(v)
      )
    )
  )

  return v
}
