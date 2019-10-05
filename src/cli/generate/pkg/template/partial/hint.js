export function hint (hb) {
  /* #if link */
  hb.hint()
    /* #if options.validate */
    .format('/*object*/.link./*link*/form.hint./*name*/')
  /* /if */
  /* else */
  hb.hint()
    /* #if options.validate */
    .format('/*object*/.form.hint./*name*/')
  /* /if */
  /* /if */
}
