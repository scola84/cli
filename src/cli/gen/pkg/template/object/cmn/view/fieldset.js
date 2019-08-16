/* custom */

export function buildFieldset(v) {
  return v.fieldset(
    /* #groups */
    v.group(
      v.title().text(
        v.print().format('/*object*/.form.title./*name*/')
      ),
      v.body(
        /* #fields */
        v.item(
          v.label(
            v.div().class('l1').text(
              v.print().format('/*object*/.form.label./*name*/')
            )
          )
        )
        /*comma*/
        /* /fields */
      )
    )
    /* /groups */
  );
}
