import fieldset from './fieldset';

export function range(v) {
  v.range()
    .attributes({
      name: '/*name*/'
    })
    /*#if max*/
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
