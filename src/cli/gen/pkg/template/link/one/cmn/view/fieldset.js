/*#if custom */
/*> custom*/
/*/if*/

export function buildFieldset(v) {
  return v.fieldset(
    /*#each groups*/
    v.group(
      v.title().text(
        v.print().format('/*object*/.link./*link*/.form.title./*name*/')
      ),
      v.body(
        /*#each fields*/
        v.item(
          /*> label*/
          /*comma always=true*/
          /*> (lookup options 'type')*/
          /*comma always=true*/
          /*> hint*/
        )
        /*comma*/
        /*/each*/
      )
    )
    /*/each*/
  );
}