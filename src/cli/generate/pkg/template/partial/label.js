export function label (hb) {
  hb.label(
    hb.div()
      .class('l1')
    /* #if link */
      .text(
        hb.print().format('/*object*/.link./*link*/.form.label./*name*/')
      )
    /* else */
      .text(
        hb.print().format('/*object*/.form.label./*name*/')
      )
    /* /if */
  )
}
