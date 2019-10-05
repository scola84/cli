export function buildActions (hb) {
  return hb.fold(
    hb.group(
      hb.title().class('click fold handle all').append(
        hb.button().text(
          hb.print().format('title.actions')
        )
      ),
      hb.body(
        /* #each links */
        hb.click(
          hb.item().class('click fold transition').append(
            hb.label(
              hb.anchor().class('l1').text(
                hb.print().format('/*object*/.link./*link*/.list.button.link')
              )
            )
          )
        ).act(
          hb.route().view('add-/*object*/-/*link*/:{/*object*/_id}@pop')
        ) /* comma */
        /* /each */
      )
    )
  )
}
