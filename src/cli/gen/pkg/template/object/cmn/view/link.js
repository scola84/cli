export function buildLinkCore (v) {
  return v.main(
    /* #each links */
    v.getList().name('/*object*/', '/*link*/').count(5).append(
      v.group(
        v.title(
          v.div().text(
            v.print().format('/*object*/.link./*link*/.title.d')
          )
        ),
        v.body(
          v.list().key((box, data) => {
            return data['/*link*/_id']
          }).empty(
            v.item().append(
              v.label(
                v.div().class('l1').text(
                  v.print().format('message.nodata')
                )
              )
            )
          ).append(
            v.click(
              v.item()
              /* #eq sides compare="two" */
                .class('click icon')
              /* else */
                .class('icon')
              /* /eq */
                .append(
                  v.click(
                    v.button().class('edit ion-ios-information-circle-outline')
                  ).act(
                    v.route().view('edit-/*object*/-/*link*/:{/*object*/_id,/*link*/_id}@pop')
                  ),
                  v.label(
                    v
                    /* #eq sides compare="two" */
                      .anchor()
                    /* else */
                      .div()
                    /* /eq */
                      .class('l1').text(
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
                  )
                  /* #eq sides compare="two" */
                  ,
                  v.icon().class('ion-ios-arrow-forward')
                  /* /eq */
                )
            ).act(
              v.route().view('view-/*link*/:{/*link*/_id}@main:rtl&mem')
            ),
            v.click().allow((box, data) => {
              return data.length === 5
            }).append(
              v.item().class('click icon').append(
                v.icon().class('ion-ios-list'),
                v.label(
                  v.anchor().class('l1').text(
                    v.print().format('/*object*/.link./*link*/.list.button.list')
                  )
                ),
                v.icon().class('ion-ios-arrow-forward')
              )
            ).act(
              v.route().view('list-/*object*/-/*link*/:{/*object*/_id}@main:mem&rtl')
            )
          )
        )
      )
    )/* comma */
    /* /each */
  )
}
