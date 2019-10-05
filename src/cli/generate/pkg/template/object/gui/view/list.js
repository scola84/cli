import { HtmlBuilder } from '@scola/lib'

export function buildList () {
  const hb = new HtmlBuilder()

  hb.build(
    hb.panel().class('outset-x outset-y').append(
      hb.header(
        hb.bar(
          hb.left(
            hb.click(
              hb.button().class('icon ion-ios-arrow-back').text(
                hb.print().format('button.back')
              )
            ).act(
              hb.route().view('main@menu:bwd&ltr')
            )
          ),
          hb.center(
            hb.title().text(
              hb.print().format('/*object*/.title.d')
            )
          ),
          hb.right(
            hb.toggle(
              hb.button().class('icon ion-ios-search')
            ).act(
              hb.selector('.search')
            ),
            hb.click(
              hb.button().class('icon ion-ios-add')
            ).act(
              hb.route().view('add-/*object*/@pop')
            )
          )
        ),
        hb.input(
          hb.search().placeholder(
            hb.print().format('search.placeholder')
          )
        ).act(
          hb.selector('.search'),
          hb.selector('.body')
        ),
        hb.message()
      ),
      hb.scroll(
        hb.body(
          hb.getList().name('/*object*/').append(
            hb.list().empty(
              hb.item().append(
                hb.label(
                  hb.div().class('l1').text(
                    hb.print().format('message.nodata')
                  )
                )
              )
            ).append(
              hb.click(
                hb.item().class('click').append(
                  hb.label(
                    hb.anchor().class('l1').text(
                      hb.print().format('/*object*/.list.item.l1')
                    ),
                    hb.div().class('l2').text(
                      hb.print().format('/*object*/.list.item.l2')
                    ),
                    hb.div().class('l3').text(
                      hb.print().format('/*object*/.list.item.l3')
                    ),
                    hb.div().class('l4').text(
                      hb.print().format('/*object*/.list.item.l4')
                    ),
                    hb.div().class('l5').text(
                      hb.print().format('/*object*/.list.item.l5')
                    )
                  )
                )
              ).act(
                hb.route().view('view-/*object*/:{/*object*/_id}@main:clr')
              )
            )
          ),
          hb.loading()
        )
      ).act(
        hb.selector('.body')
      ),
      hb.footer(
        hb.bar(
          hb.right(
            hb.click(
              hb.button().class('icon ion-ios-refresh')
            ).act(
              hb.route().view('@menu:his')
            )
          )
        )
      )
    )
  )

  return hb
}
