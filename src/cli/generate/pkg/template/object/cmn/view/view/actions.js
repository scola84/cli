export function buildActions (hb) {
  return hb.fold(
    hb.group(
      hb.title().class('click fold handle all').append(
        hb.button().text(
          hb.print().format('title.actions')
        )
      ),
      hb.body(
        hb.click(
          hb.item().class('click fold transition').append(
            hb.label(
              hb.anchor().class('l1').text(
                hb.print().format('/*object*/.view.actions.button.edit')
              )
            )
          )
        ).act(
          hb.route().view('edit-/*object*/:{/*object*/_id}@pop')
        ),
        hb.click(
          hb.item().class('click fold transition').append(
            hb.label(
              hb.anchor().class('l1').text(
                hb.print().format('/*object*/.view.actions.button.link')
              )
            ),
            hb.icon().class('ion-ios-arrow-forward')
          )
        ).act(
          hb.route().view('link-/*object*/:{/*object*/_id}@main:mem&rtl')
        )
      )
    )
  )
}
