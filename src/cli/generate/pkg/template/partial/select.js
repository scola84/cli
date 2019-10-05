export function select (hb) {
  hb.select().wrap()
    .attributes({
      name: '/*name*/'
    })
    /* #if required */
    .attributes({
      required: 'required'
    })
    /* /if */
    .properties({
      value: (box, data) => data['/*name*/']
    })
    .append(
      /* #each values */
      hb.option()
        .attributes({
          value: '/*value*/'
        })
      /* #if link */
        .text(
          hb.print().format('/*object*/.link./*link*/.form.value./*value*/')
        ) /* comma */
      /* else */
        .text(
          hb.print().format('/*object*/.form.value./*value*/')
        ) /* comma */
      /* /if */
      /* /each */
    )
}
