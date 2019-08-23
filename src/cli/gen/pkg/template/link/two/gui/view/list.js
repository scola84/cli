import { ViewBuilder } from '@scola/dom'
import { buildAside } from '../../../cmn/view//*link*//aside'
import { buildListCore } from '../../../cmn/view//*link*//list'

export function buildList () {
  const v = new ViewBuilder()

  v.build(
    v.panel(
      v.header(
        v.bar(
          v.left(
            v.click(
              v.button().class('icon ion-ios-arrow-back').text(
                v.print().format('button.back')
              )
            ).act(
              v.route().view('view-/*object*/:{/*object*/_id}@main:bwd&ltr')
            )
          ),
          v.center(
            v.title().text(
              v.print().format('/*object*/.link./*link*/.title.d')
            )
          ),
          v.right(
            v.toggle(
              v.button().class('icon ion-ios-search')
            ).act(
              v.selector('.search')
            )
          )
        ),
        v.input(
          v.search().placeholder(
            v.print().format('search.placeholder')
          )
        ).act(
          v.selector('.search'),
          v.selector('.body .group.list')
        ),
        v.message()
      ),
      v.scroll(
        v.body(
          buildListCore(v),
          buildAside(v)
        )
      ).act(
        v.selector('.body .group.list')
      )
    )
  )

  return v
}
