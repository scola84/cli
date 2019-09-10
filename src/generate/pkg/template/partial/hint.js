export function hint (vb) {
  /* #if link */
  vb.hint()
    /* #if options.validate */
    .format('/*object*/.link./*link*/form.hint./*name*/')
  /* /if */
  /* else */
  vb.hint()
    /* #if options.validate */
    .format('/*object*/.form.hint./*name*/')
  /* /if */
  /* /if */
}
