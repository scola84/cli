import { ViewBuilder } from '@scola/dom'
import { buildAside } from '../../../cmn/view//*link*//aside'
import { buildListCore } from '../../../cmn/view//*link*//list'

export function buildList () {
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
              vb.print().format('/*object*/.link./*link*/.title.d')
            )
          ),
          vb.right(
            vb.toggle(
              vb.button().class('icon ion-ios-search')
            ).act(
              vb.selector('.search')
            )
          )
        ),
        vb.input(
          vb.search().placeholder(
            vb.print().format('search.placeholder')
          )
        ).act(
          vb.selector('.search'),
          vb.selector('.body .group.list')
        ),
        vb.message()
      ),
      vb.scroll(
        vb.body(
          buildListCore(vb),
          buildAside(vb)
        )
      ).act(
        vb.selector('.body .group.list')
      )
    )
  )

  return vb
}
