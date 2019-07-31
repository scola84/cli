import { ViewBuilder } from '@scola/dom';

export function buildList() {
  const b = new ViewBuilder();

  const p = b.panel().class('outset-x outset-y').append(
    b.header(
      b.bar(
        b.left(
          b.click(
            b.button().class('icon ion-ios-arrow-back').text(
              b.print().format('button.back')
            )
          ).act(
            b.route().view('main@menu:bwd;ltr')
          )
        ),
        b.center(
          b.title().text(
            b.print().format('__OBJECT_LC__.title.d')
          )
        ),
        b.right(
          b.toggle(
            b.button().class('icon ion-ios-search')
          ).act(
            b.selector('.search')
          ),
          b.click(
            b.button().class('icon ion-ios-add')
          ).act(
            b.route().view('add-__OBJECT_LC__@pop')
          )
        )
      ),
      b.input(
        b.search().placeholder(
          b.print().format('search.placeholder')
        )
      ).act(
        b.selector('.search')
      ).ref(
        b.selector((s) => s && s.getId() === 'scroll')
      ),
      b.message()
    ),
    b.scroll().id('scroll').append(
      b.body(
        b.list(
          b.click(
            b.item().class('click').append(
              b.label(
                b.div().class('l1').text(
                  b.print().format('__OBJECT_LC__.list.item.l1')
                )
              )
            )
          ).act(
            b.route().view('view-__OBJECT_LC__@main:clr').object()
          ),
          b.item().append(
            b.label(
              b.div().class('l1').text(
                b.print().format('message.nodata')
              )
            )
          )
        ),
        b.loading()
      )
    ).act(
      b.request().resource('/api/__OBJECT_LC__').list().indicator(
        b.selector('.loading')
      ).act(
        b.selector('.list')
      ).err(
        b.selector('.message'),
        b.selector('.list')
      )
    )
  );

  return b.build(p);
}
