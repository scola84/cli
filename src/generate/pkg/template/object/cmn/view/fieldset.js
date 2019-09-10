/* #if custom */
/* > custom */
/* /if */

export function buildFieldset (vb) {
  return vb.fieldset(
    /* #each groups */
    vb.group(
      vb.title().text(
        vb.print().format('/*object*/.form.title./*name*/')
      ),
      vb.body(
        /* #each fields */
        vb.item(
          /* > label */
          /* comma always=true */
          /* > (lookup options 'type') */
          /* comma always=true */
          /* > hint */
        ) /* comma */
        /* /each */
      )
    )
    /* /each */
  )
}
