export function select (vb) {
  vb.select().wrap()
    .attributes({
      name: '/*name*/'
    })
    /* #if required */
    .attributes({
      required: 'required'
    })
    /* /if */
    .properties({
      value: (route, data) => data['/*name*/']
    })
    .append(
      /* #each values */
      vb.option()
        .attributes({
          value: '/*value*/'
        })
      /* #if link */
        .text(
          vb.print().format('/*object*/.link./*link*/.form.value./*value*/')
        ) /* comma */
      /* else */
        .text(
          vb.print().format('/*object*/.form.value./*value*/')
        ) /* comma */
      /* /if */
      /* /each */
    )
}
