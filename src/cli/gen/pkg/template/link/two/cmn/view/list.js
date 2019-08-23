export function buildListCore (v) {
  return v.main(
    v.group().class('list').append(
      v.title(
        v.div().text(
          v.print().format('/*object*/.link./*link*/.title.d')
        )
      ),
      v.body(
        v.getList().name('/*object*/', '/*link*/').append(
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
              v.item().class('click icon').append(
                v.click(
                  v.button().class('edit ion-ios-information-circle-outline')
                ).act(
                  v.route().view('edit-/*object*/-/*link*/:{/*object*/_id,/*link*/_id}@pop')
                ),
                v.label(
                  v.anchor().class('l1').text(
                    v.print().format('/*object*/.link./*link*/.list.item.l1')
                  ),
                  v.div().class('l2').text(
                    v.print().format('/*object*/.link./*link*/.list.item.l2')
                  ),
                  v.div().class('l3').text(
                    v.print().format('/*object*/.link./*link*/.list.item.l3')
                  ),
                  v.div().class('l4').text(
                    v.print().format('/*object*/.link./*link*/.list.item.l4')
                  ),
                  v.div().class('l5').text(
                    v.print().format('/*object*/.link./*link*/.list.item.l5')
                  )
                ),
                v.icon().class('ion-ios-arrow-forward')
              )
            ).act(
              v.route().view('view-/*link*/:{/*link*/_id}@main:rtl&mem')
            )
          )
        )
      )
    )
  )
}
