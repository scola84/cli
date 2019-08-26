export function buildLinkCore (vb) {
  return vb.main(
    /* #each links */
    vb.getList().name('/*object*/', '/*link*/').count(5).append(
      vb.group(
        vb.title(
          vb.div().text(
            vb.print().format('/*object*/.link./*link*/.title.d')
          )
        ),
        vb.body(
          vb.list().key((route, data) => {
            return data['/*link*/_id']
          }).empty(
            vb.item().append(
              vb.label(
                vb.div().class('l1').text(
                  vb.print().format('message.nodata')
                )
              )
            )
          ).append(
            vb.click(
              vb.item()
              /* #eq sides compare="two" */
                .class('click icon')
              /* else */
                .class('icon')
              /* /eq */
                .append(
                  vb.click(
                    vb.button().class('edit ion-ios-information-circle-outline')
                  ).act(
                    vb.route().view('edit-/*object*/-/*link*/:{/*object*/_id,/*link*/_id}@pop')
                  ),
                  vb.label(
                    vb
                    /* #eq sides compare="two" */
                      .anchor()
                    /* else */
                      .div()
                    /* /eq */
                      .class('l1').text(
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
                  )
                  /* #eq sides compare="two" */
                  ,
                  vb.icon().class('ion-ios-arrow-forward')
                /* /eq */
                )
            ).act(
              vb.route().view('view-/*link*/:{/*link*/_id}@main:rtl&mem')
            ),
            vb.click().allow((route, data) => {
              return data.length === 5
            }).append(
              vb.item().class('click icon').append(
                vb.icon().class('ion-ios-list'),
                vb.label(
                  vb.anchor().class('l1').text(
                    vb.print().format('/*object*/.link./*link*/.list.button.list')
                  )
                ),
                vb.icon().class('ion-ios-arrow-forward')
              )
            ).act(
              vb.route().view('list-/*object*/-/*link*/:{/*object*/_id}@main:mem&rtl')
            )
          )
        )
      )
    ) /* comma */
    /* /each */
  )
}
