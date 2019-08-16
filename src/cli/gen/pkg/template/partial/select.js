import fieldset from './fieldset';

export function select(v) {
  v.select()
    .wrap()
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
    })
    .append(
      /*#each values */
      v.option()
      .attributes({
        value: '/*value*/'
      })
      /*#if link*/
      .text(
        v.print().format('/*object*/.link./*link*/.form.value./*value*/')
      )
      /*else*/
      .text(
        v.print().format('/*object*/.form.value./*value*/')
      )
      /*/if*/
      /*comma*/
      /*/each*/
    );
}
