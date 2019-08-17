import { ViewBuilder } from '@scola/dom';

export function buildList() {
  const v = new ViewBuilder();

  v.build(
    v.panel().class('outset-x outset-y').append(
      v.header(
        v.bar(
          v.left(
            v.click(
              v.button().class('icon ion-ios-arrow-back').text(
                v.print().format('button.back')
              )
            ).act(
              v.route().view('main@menu:bwd&ltr')
            )
          ),
          v.center(
            v.title().text(
              v.print().format('/*object*/.title.d')
            )
          ),
          v.right(
            v.toggle(
              v.button().class('icon ion-ios-search')
            ).act(
              v.selector('.search')
            ),
            v.click(
              v.button().class('icon ion-ios-add')
            ).act(
              v.route().view('add-/*object*/@pop')
            )
          )
        ),
        v.input(
          v.search().placeholder(
            v.print().format('search.placeholder')
          )
        ).act(
          v.selector('.search'),
          v.selector('.body')
        ),
        v.message()
      ),
      v.scroll(
        v.body(
          v.getList().name('/*object*/').append(
            v.list().empty(
              v.item().append(
                v.label(
                  v.div().class('l1').text(
                    v.print().format('message.nodata')
                  )
                )
              )
            ).append(
              v.click(
                v.item().class('click').append(
                  v.label(
                    v.anchor().class('l1').text(
                      v.print().format('/*object*/.list.item.l1')
                    ),
                    v.div().class('l2').text(
                      v.print().format('/*object*/.list.item.l2')
                    ),
                    v.div().class('l3').text(
                      v.print().format('/*object*/.list.item.l3')
                    ),
                    v.div().class('l4').text(
                      v.print().format('/*object*/.list.item.l4')
                    ),
                    v.div().class('l5').text(
                      v.print().format('/*object*/.list.item.l5')
                    )
                  )
                )
              ).act(
                v.route().view('view-/*object*/:{/*object*/_id}@main:clr')
              )
            )
          ),
          v.loading()
        )
      ).act(
        v.selector('.body')
      ),
      v.footer(
        v.bar(
          v.right(
            v.click(
              v.button().class('icon ion-ios-refresh')
            ).act(
              v.route().view('@menu:his')
            )
          )
        )
      )
    )
  );

  return v;
}
