import { HtmlBuilder } from '@scola/lib'
import { buildAside } from '../../../cmn/view//*link*//aside'
import { buildListCore } from '../../../cmn/view//*link*//list'

export function buildList () {
  const lister = new HtmlBuilder({
    view (hb) {
      return hb.panel(
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
                hb.print().format('/*object*/.link./*link*/.title.d')
              )
            ),
            hb.right(
              hb.toggle(
                hb.button().class('icon ion-ios-search')
              ).act(
                hb.selector('.search')
              )
            )
          ),
          hb.input(
            hb.search().placeholder(
              hb.print().format('search.placeholder')
            )
          ).act(
            hb.selector('.search'),
            hb.selector('.body .group.list')
          ),
          hb.message()
        ),
        hb.scroll(
          hb.body(
            buildListCore(hb),
            buildAside(hb)
          )
        ).act(
          hb.selector('.body .group.list')
        )
      )
    }
  })

  return lister
}
