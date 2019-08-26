import fieldset from './fieldset'

export function time (vb) {
  vb.time()
    .attributes({
      name: '/*name*/'
    })
    /* #if max */
    .attributes({
      max: fieldset['/*name*/'].max
    })
    /* /if */
    /* #if options.min */
    .attributes({
      min: fieldset['/*name*/'].min
    })
    /* /if */
    /* #if required */
    .attributes({
      required: 'required'
    })
    /* /if */
    /* #if options.from */
    .formatFrom(
      fieldset['/*name*/'].from
    )
    /* /if */
    /* #if options.to */
    .formatTo(
      fieldset['/*name*/'].to
    )
    /* /if */
    .properties({
      value: (route, data) => data['/*name*/']
    })
}
