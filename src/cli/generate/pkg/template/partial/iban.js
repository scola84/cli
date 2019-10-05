export function iban (hb) {
  hb.text()
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
