export function hint(v) {
  /*#if link*/
  v.hint()
    /*#if options.validate*/
    .format('/*object*/.link./*link*/form.hint./*name*/');
  /*/if*/
  /*else*/
  v.hint()
    /*#if options.validate*/
    .format('/*object*/.form.hint./*name*/');
  /*/if*/
  /*/if*/
}
