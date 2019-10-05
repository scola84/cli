export function buildProperties (hb) {
  return hb.fold(
    hb.group(
      hb.title().class('click fold handle all').append(
        hb.button().text(
          hb.print().format('title.properties')
        )
      ),
      hb.body(
        /* #each groups */
        /* #each fields */
        /* #if options.property */
        hb.item().class('fold transition').append(
          hb.label(
            hb.div().class('l0').text(
              hb.print().format('/*object*/.view.properties./*name*/.l0')
            ),
            hb.div().class('l1 placeholder').text(
              hb.print().format('/*object*/.view.properties./*name*/.l1')
            )
          )
        ) /* comma */
        /* /if */
        /* /each */
        /* /each */
      )
    )
  )
}
