export function buildCurrent (v) {
  return v.group().class('current').append(
    v.title().text(
      v.print().format('/*object*/.link./*link*/.title.current')
    ),
    v.body(
      v.item(
        v.click(
          v.button().class('click delete ion-ios-remove-circle')
        ).act(
          v.deleteObject().name('/*object*/', '/*link*/')
        ),
        v.radio().wrap().attributes({
          name: '/*link*/_id',
          checked: 'checked',
          required: 'required',
          value: (box, data) => data['/*link*/_id']
        }),
        v.label(
          v.div().class('l1').text(
            v.print().format('/*object*/.link./*link*/.list.item.l1')
          ),
          v.div().class('l2').text(
            v.print().format('/*object*/.link./*link*/.list.item.l2')
          ),
          v.div().class('l3').text(
            v.print().format('/*object*/.link./*link*/.list.item.l3')
          ),
          v.div().class('l4').text(
            v.print().format('/*object*/.link./*link*/.list.item.l4')
          ),
          v.div().class('l5').text(
            v.print().format('/*object*/.link./*link*/.list.item.l5')
          )
        )
      )
    )
  )
}
