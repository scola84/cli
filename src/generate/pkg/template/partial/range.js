import fieldset from './fieldset'

export function range (vb) {
  vb.range()
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
    /* #if options.clean */
    .clean(
      fieldset['/*name*/'].clean
    )
    /* /if */
    /* #if options.validate */
    .validate(
      fieldset['/*name*/'].validate
    )
    /* /if */
    .properties({
      value: (route, data) => data['/*name*/']
    })
}
