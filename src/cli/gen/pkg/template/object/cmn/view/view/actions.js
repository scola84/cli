export function buildActions (vb) {
  return vb.fold(
    vb.group(
      vb.title().class('click fold handle all').append(
        vb.button().text(
          vb.print().format('title.actions')
        )
      ),
      vb.body(
        vb.click(
          vb.item().class('click fold transition').append(
            vb.label(
              vb.anchor().class('l1').text(
                vb.print().format('/*object*/.view.actions.button.edit')
              )
            )
          )
        ).act(
          vb.route().view('edit-/*object*/:{/*object*/_id}@pop')
        ),
        vb.click(
          vb.item().class('click fold transition').append(
            vb.label(
              vb.anchor().class('l1').text(
                vb.print().format('/*object*/.view.actions.button.link')
              )
            ),
            vb.icon().class('ion-ios-arrow-forward')
          )
        ).act(
          vb.route().view('link-/*object*/:{/*object*/_id}@main:mem&rtl')
        )
      )
    )
  )
}
