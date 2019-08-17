import fieldset from './fieldset';

export function number(v) {
  v.number()
    .attributes({
      name: '/*name*/'
    })
    /*#if options.max*/
    .attributes({
      max: fieldset['/*name*/'].max
    })
    /*/if*/
    /*#if options.min*/
    .attributes({
      min: fieldset['/*name*/'].min
    })
    /*/if*/
    /*#if required*/
    .attributes({
      required: 'required'
    })
    /*/if*/
    /*#if options.validate*/
    .custom(
      fieldset['/*name*/'].validate
    )
    /*/if*/
    .properties({
      value: (box, data) => data['/*name*/']
    });
}
