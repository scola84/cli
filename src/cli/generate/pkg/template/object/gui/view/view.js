import { HtmlBuilder } from '@scola/lib'
import { buildAside } from '../../../cmn/view//*object*//view/aside'
import { buildViewCore } from '../../../cmn/view//*object*//view'

export function buildView () {
  const viewer = new HtmlBuilder({
    view (hb) {
      return hb.panel(
        hb.header(
          hb.bar(
            hb.left(
              hb.click(
                hb.button().menu().class('icon ion-ios-arrow-back').text(
                  hb.print().format('button.back')
                )
              ).act(
                hb.route().view('@main:bwd&ltr')
              )
            ),
            hb.center(
              hb.title().text(
                hb.print().format('/*object*/.title.1')
              )
            )
          ),
          hb.message(),
          hb.progress()
        ),
        hb.body(
          buildViewCore(hb),
          buildAside(hb)
        )
      )
    }
  })

  return viewer
}
