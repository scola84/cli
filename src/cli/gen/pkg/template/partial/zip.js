import fieldset from './fieldset'

export function zip (v) {
  v.zip()
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
      value: (box, data) => data['/*name*/']
    })
}
