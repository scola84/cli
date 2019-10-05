import fieldset from './fieldset'

export function file (hb) {
  hb.file()
    .attributes({
      name: '/*name*/'
    })
    /* #if options.accept */
    .attributes({
      accept: fieldset['/*name*/'].accept
    })
    /* /if */
    /* #if options.maxsize */
    .attributes({
      maxsize: fieldset['/*name*/'].maxsize
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
      value: (box, data) => data['/*name*/']
    })
}
