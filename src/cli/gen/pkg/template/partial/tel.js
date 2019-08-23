import fieldset from './fieldset'

export function tel (v) {
  v.tel()
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
    /* #if options.format */
    .format(
      fieldset['/*name*/'].format
    )
    /* /if */
    .properties({
      value: (box, data) => data['/*name*/']
    })
}
