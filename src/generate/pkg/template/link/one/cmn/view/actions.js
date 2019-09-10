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
                vb.print().format('/*object*/.link./*link*/.list.button.link')
              )
            )
          )
        ).act(
          vb.route().view('add-/*object*/-/*link*/:{/*object*/_id}@pop')
        )
      )
    )
  )
}
