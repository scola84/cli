export function buildActions (v) {
  return v.fold(
    v.group(
      v.title().class('click fold handle all').append(
        v.button().text(
          v.print().format('title.actions')
        )
      ),
      v.body(
        /* #each links */
        v.click(
          v.item().class('click fold transition').append(
            v.label(
              v.anchor().class('l1').text(
                v.print().format('/*object*/.link./*link*/.list.button.link')
              )
            )
          )
        ).act(
          v.route().view('add-/*object*/-/*link*/:{/*object*/_id}@pop')
        )/* comma */
        /* /each */
      )
    )
  )
}
