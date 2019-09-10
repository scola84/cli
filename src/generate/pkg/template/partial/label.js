export function label (vb) {
  vb.label(
    vb.div()
      .class('l1')
    /* #if link */
      .text(
        vb.print().format('/*object*/.link./*link*/.form.label./*name*/')
      )
    /* else */
      .text(
        vb.print().format('/*object*/.form.label./*name*/')
      )
    /* /if */
  )
}
