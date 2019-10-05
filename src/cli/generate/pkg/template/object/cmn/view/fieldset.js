/* #if custom */
/* > custom */
/* /if */

export function buildFieldset (hb) {
  return hb.fieldset(
    /* #each groups */
    hb.group(
      hb.title().text(
        hb.print().format('/*object*/.form.title./*name*/')
      ),
      hb.body(
        /* #each fields */
        hb.item(
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
