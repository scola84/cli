export function select (v) {
  v.select().wrap()
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
      v.option()
        .attributes({
          value: '/*value*/'
        })
      /* #if link */
        .text(
          v.print().format('/*object*/.link./*link*/.form.value./*value*/')
        )/* comma */
      /* else */
        .text(
          v.print().format('/*object*/.form.value./*value*/')
        )/* comma */
      /* /if */
      /* /each */
    )
}
