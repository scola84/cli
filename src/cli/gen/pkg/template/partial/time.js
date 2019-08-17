import fieldset from './fieldset';

export function time(v) {
  v.time()
    .attributes({
      name: '/*name*/'
    })
    /*#if required*/
    .attributes({
      required: 'required'
    })
    /*/if*/
    /*#if options.from*/
    .formatFrom(
      fieldset['/*name*/'].from
    )
    /*/if*/
    /*#if options.to*/
    .formatTo(
      fieldset['/*name*/'].to
    )
    /*/if*/
    .properties({
      value: (box, data) => data['/*name*/']
    });
}
