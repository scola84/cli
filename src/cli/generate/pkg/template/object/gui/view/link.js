import { HtmlBuilder } from '@scola/lib'
import { buildAside } from '../../../cmn/view//*object*//link/aside'
import { buildLinkCore } from '../../../cmn/view//*object*//link'

export function buildLink () {
  const hb = new HtmlBuilder()

  hb.build(
    hb.panel(
      hb.header(
        hb.bar(
          hb.left(
            hb.click(
              hb.button().class('icon ion-ios-arrow-back').text(
                hb.print().format('button.back')
              )
            ).act(
              hb.route().view('view-/*object*/:{/*object*/_id}@main:bwd&ltr')
            )
          ),
          hb.center(
            hb.title().text(
              hb.print().format('title.link')
            )
          )
        ),
        hb.message(),
        hb.progress()
      ),
      hb.body(
        buildLinkCore(hb),
        buildAside(hb)
      )
    )
  )

  return hb
}
