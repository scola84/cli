import fieldset from './fieldset'

export function zip (vb) {
  vb.zip()
    .attributes({
      name: '/*name*/'
    })
    /* #if required */
    .attributes({
      required: 'required'
    })
    /* /if */
    /* #if options.country */
    .country(
      fieldset['/*name*/'].country
    )
    /* /if */
    .properties({
      value: (route, data) => data['/*name*/']
    })
}
