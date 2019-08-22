export function buildActions(v) {
  return v.fold(
    v.group(
      v.title().class('click fold handle all').append(
        v.button().text(
          v.print().format('title.actions')
        )
      ),
      v.body(
        v.click(
          v.item().class('click fold transition').append(
            v.label(
              v.anchor().class('l1').text(
                v.print().format('/*object*/.view.actions.button.edit')
              )
            )
          )
        ).act(
          v.route().view('edit-/*object*/:{/*object*/_id}@pop')
        ),
        v.click(
          v.item().class('click fold transition').append(
            v.label(
              v.anchor().class('l1').text(
                v.print().format('/*object*/.view.actions.button.link')
              )
            ),
            v.icon().class('ion-ios-arrow-forward')
          )
        ).act(
          v.route().view('link-/*object*/:{/*object*/_id}@main:mem&rtl')
        )
      )
    )
  );
}
