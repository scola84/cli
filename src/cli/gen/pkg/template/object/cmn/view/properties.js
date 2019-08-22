export function buildProperties(v) {
  return v.fold(
    v.group(
      v.title().class('click fold handle all').append(
        v.button().text(
          v.print().format('title.properties')
        )
      ),
      v.body(
        /*#each groups*/
        /*#each fields*/
        /*#if options.property*/
        v.item().class('fold transition').append(
          v.label(
            v.div().class('l0').text(
              v.print().format('/*object*/.view.properties./*name*/.l0')
            ),
            v.div().class('l1 placeholder').text(
              v.print().format('/*object*/.view.properties./*name*/.l1')
            )
          )
        )
        /*comma*/
        /*/if*/
        /*/each*/
        /*/each*/
      )
    )
  );
}
