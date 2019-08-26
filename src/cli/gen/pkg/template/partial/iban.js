export function iban (vb) {
  vb.text()
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
