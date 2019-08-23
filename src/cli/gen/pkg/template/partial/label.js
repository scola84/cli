export function label (v) {
  v.label(
    v.div()
      .class('l1')
    /* #if link */
      .text(
        v.print().format('/*object*/.link./*link*/.form.label./*name*/')
      )
    /* else */
      .text(
        v.print().format('/*object*/.form.label./*name*/')
      )
    /* /if */
  )
}
