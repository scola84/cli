export function color(v) {
  v.color()
    .attributes({
      name: '/*name*/'
    })
    /*#if required*/
    .attributes({
      required: 'required'
    })
    /*/if*/
    .properties({
      value: (box, data) => data['/*name*/']
    });
}
