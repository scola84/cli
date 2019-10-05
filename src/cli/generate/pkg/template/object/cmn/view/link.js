export function buildLinkCore (hb) {
  return hb.main(
    /* #each links */
    hb.getList().name('/*object*/', '/*link*/').count(5).append(
      hb.group(
        hb.title(
          hb.div().text(
            hb.print().format('/*object*/.link./*link*/.title.d')
          )
        ),
        hb.body(
          hb.list().key((box, data) => {
            return data['/*link*/_id']
          }).empty(
            hb.item().append(
              hb.label(
                hb.div().class('l1').text(
                  hb.print().format('message.nodata')
                )
              )
            )
          ).append(
            hb.click(
              hb.item()
              /* #eq sides compare="two" */
                .class('click icon')
              /* else */
                .class('icon')
              /* /eq */
                .append(
                  hb.click(
                    hb.button().class('edit ion-ios-information-circle-outline')
                  ).act(
                    hb.route().view('edit-/*object*/-/*link*/:{/*object*/_id,/*link*/_id}@pop')
                  ),
                  hb.label(
                    hb
                    /* #eq sides compare="two" */
                      .anchor()
                    /* else */
                      .div()
                    /* /eq */
                      .class('l1').text(
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
                  )
                  /* #eq sides compare="two" */
                  ,
                  hb.icon().class('ion-ios-arrow-forward')
                /* /eq */
                )
            ).act(
              hb.route().view('view-/*link*/:{/*link*/_id}@main:rtl&mem')
            ),
            hb.click().allow((box, data) => {
              return data.length === 5
            }).append(
              hb.item().class('click icon').append(
                hb.icon().class('ion-ios-list'),
                hb.label(
                  hb.anchor().class('l1').text(
                    hb.print().format('/*object*/.link./*link*/.list.button.list')
                  )
                ),
                hb.icon().class('ion-ios-arrow-forward')
              )
            ).act(
              hb.route().view('list-/*object*/-/*link*/:{/*object*/_id}@main:mem&rtl')
            )
          )
        )
      )
    ) /* comma */
    /* /each */
  )
}
