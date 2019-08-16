import fieldset from './fieldset';

export function email(v) {
  v.date()
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
    /*#if options.custom*/
    .custom(
      fieldset['/*name*/'].validate
    )
    /*else*/
    .custom(
      () => true
    )
    /*/if*/
    .properties({
      value: (box, data) => data['/*name*/']
    });
}
