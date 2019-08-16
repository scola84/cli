export function hint(v) {
  v.hint()
    /*#if options.custom*/
    .format((box, data) => {
      return `/*object*/.form.hint.${data.original['/*name*/']}`;
    });
  /*/if*/
}
