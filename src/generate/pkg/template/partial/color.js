export function color (vb) {
  vb.color()
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
}
