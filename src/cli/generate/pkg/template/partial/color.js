export function color (hb) {
  hb.color()
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
}
