import { ViewBuilder } from '@scola/dom'

export function buildList () {
  const vb = new ViewBuilder()

  vb.build(
    vb.panel().class('outset-x outset-y').append(
      vb.header(
        vb.bar(
          vb.left(
            vb.click(
              vb.button().class('icon ion-ios-arrow-back').text(
                vb.print().format('button.back')
              )
            ).act(
              vb.route().view('main@menu:bwd&ltr')
            )
          ),
          vb.center(
            vb.title().text(
              vb.print().format('/*object*/.title.d')
            )
          ),
          vb.right(
            vb.toggle(
              vb.button().class('icon ion-ios-search')
            ).act(
              vb.selector('.search')
            ),
            vb.click(
              vb.button().class('icon ion-ios-add')
            ).act(
              vb.route().view('add-/*object*/@pop')
            )
          )
        ),
        vb.input(
          vb.search().placeholder(
            vb.print().format('search.placeholder')
          )
        ).act(
          vb.selector('.search'),
          vb.selector('.body')
        ),
        vb.message()
      ),
      vb.scroll(
        vb.body(
          vb.getList().name('/*object*/').append(
            vb.list().empty(
              vb.item().append(
                vb.label(
                  vb.div().class('l1').text(
                    vb.print().format('message.nodata')
                  )
                )
              )
            ).append(
              vb.click(
                vb.item().class('click').append(
                  vb.label(
                    vb.anchor().class('l1').text(
                      vb.print().format('/*object*/.list.item.l1')
                    ),
                    vb.div().class('l2').text(
                      vb.print().format('/*object*/.list.item.l2')
                    ),
                    vb.div().class('l3').text(
                      vb.print().format('/*object*/.list.item.l3')
                    ),
                    vb.div().class('l4').text(
                      vb.print().format('/*object*/.list.item.l4')
                    ),
                    vb.div().class('l5').text(
                      vb.print().format('/*object*/.list.item.l5')
                    )
                  )
                )
              ).act(
                vb.route().view('view-/*object*/:{/*object*/_id}@main:clr')
              )
            )
          ),
          vb.loading()
        )
      ).act(
        vb.selector('.body')
      ),
      vb.footer(
        vb.bar(
          vb.right(
            vb.click(
              vb.button().class('icon ion-ios-refresh')
            ).act(
              vb.route().view('@menu:his')
            )
          )
        )
      )
    )
  )

  return vb
}
