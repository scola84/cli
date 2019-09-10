export function buildProperties (vb) {
  return vb.fold(
    vb.group(
      vb.title().class('click fold handle all').append(
        vb.button().text(
          vb.print().format('title.properties')
        )
      ),
      vb.body(
        /* #each groups */
        /* #each fields */
        /* #if options.property */
        vb.item().class('fold transition').append(
          vb.label(
            vb.div().class('l0').text(
              vb.print().format('/*object*/.view.properties./*name*/.l0')
            ),
            vb.div().class('l1 placeholder').text(
              vb.print().format('/*object*/.view.properties./*name*/.l1')
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
