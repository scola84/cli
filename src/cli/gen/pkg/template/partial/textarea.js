import fieldset from './fieldset';

export function textarea(v) {
  v.textarea()
    .attributes({
      name: '/*name*/'
    })
    /*#if maxlength*/
    .attributes({
      maxlength: '/*maxlength*/'
    })
    /*/if*/
    /*#if required*/
    .attributes({
      required: 'required'
    })
    /*/if*/
    /*#if options.clean*/
    .clean(
      fieldset['/*name*/'].clean
    )
    /*/if*/
    /*#if options.validate*/
    .validate(
      fieldset['/*name*/'].validate
    )
    /*/if*/
    .properties({
      value: (box, data) => data['/*name*/']
    });
}
