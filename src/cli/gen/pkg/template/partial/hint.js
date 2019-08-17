export function hint(v) {
  v.hint()
    /*#if options.validate*/
    .format((box, data) => {
      return `/*object*/.form.hint.${data.original['/*name*/']}`;
    });
  /*/if*/
}
