export function buildListCore (hb) {
  return hb.main(
    hb.group().class('list').append(
      hb.title(
        hb.div().text(
          hb.print().format('/*object*/.link./*link*/.title.d')
        )
      ),
      hb.body(
        hb.getList().name('/*object*/', '/*link*/').append(
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
              hb.item().class('click icon').append(
                hb.click(
                  hb.button().class('edit ion-ios-information-circle-outline')
                ).act(
                  hb.route().view('edit-/*object*/-/*link*/:{/*object*/_id,/*link*/_id}@pop')
                ),
                hb.label(
                  hb.anchor().class('l1').text(
                    hb.print().format('/*object*/.link./*link*/.list.item.l1')
                  ),
                  hb.div().class('l2').text(
                    hb.print().format('/*object*/.link./*link*/.list.item.l2')
                  ),
                  hb.div().class('l3').text(
                    hb.print().format('/*object*/.link./*link*/.list.item.l3')
                  ),
                  hb.div().class('l4').text(
                    hb.print().format('/*object*/.link./*link*/.list.item.l4')
                  ),
                  hb.div().class('l5').text(
                    hb.print().format('/*object*/.link./*link*/.list.item.l5')
                  )
                ),
                hb.icon().class('ion-ios-arrow-forward')
              )
            ).act(
              hb.route().view('view-/*link*/:{/*link*/_id}@main:rtl&mem')
            )
          )
        )
      )
    )
  )
}
