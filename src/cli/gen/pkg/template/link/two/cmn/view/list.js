export function buildListCore (vb) {
  return vb.main(
    vb.group().class('list').append(
      vb.title(
        vb.div().text(
          vb.print().format('/*object*/.link./*link*/.title.d')
        )
      ),
      vb.body(
        vb.getList().name('/*object*/', '/*link*/').append(
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
              vb.item().class('click icon').append(
                vb.click(
                  vb.button().class('edit ion-ios-information-circle-outline')
                ).act(
                  vb.route().view('edit-/*object*/-/*link*/:{/*object*/_id,/*link*/_id}@pop')
                ),
                vb.label(
                  vb.anchor().class('l1').text(
                    vb.print().format('/*object*/.link./*link*/.list.item.l1')
                  ),
                  vb.div().class('l2').text(
                    vb.print().format('/*object*/.link./*link*/.list.item.l2')
                  ),
                  vb.div().class('l3').text(
                    vb.print().format('/*object*/.link./*link*/.list.item.l3')
                  ),
                  vb.div().class('l4').text(
                    vb.print().format('/*object*/.link./*link*/.list.item.l4')
                  ),
                  vb.div().class('l5').text(
                    vb.print().format('/*object*/.link./*link*/.list.item.l5')
                  )
                ),
                vb.icon().class('ion-ios-arrow-forward')
              )
            ).act(
              vb.route().view('view-/*link*/:{/*link*/_id}@main:rtl&mem')
            )
          )
        )
      )
    )
  )
}
