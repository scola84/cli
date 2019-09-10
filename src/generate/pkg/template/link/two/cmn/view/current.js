export function buildCurrent (vb) {
  return vb.group().class('current').append(
    vb.title().text(
      vb.print().format('/*object*/.link./*link*/.title.current')
    ),
    vb.body(
      vb.item(
        vb.click(
          vb.button().class('click delete ion-ios-remove-circle')
        ).act(
          vb.deleteObject().name('/*object*/', '/*link*/')
        ),
        vb.radio().wrap().attributes({
          name: '/*link*/_id',
          checked: 'checked',
          required: 'required',
          value: (route, data) => data['/*link*/_id']
        }),
        vb.label(
          vb.div().class('l1').text(
            vb.print().format('/*object*/.link./*link*/.list.item.l1')
          ),
          vb.div().class('l2').text(
            vb.print().format('/*object*/.link./*link*/.list.item.l2')
          ),
          vb.div().class('l3').text(
            vb.print().format('/*object*/.link./*link*/.list.item.l3')
          ),
          vb.div().class('l4').text(
            vb.print().format('/*object*/.link./*link*/.list.item.l4')
          ),
          vb.div().class('l5').text(
            vb.print().format('/*object*/.link./*link*/.list.item.l5')
          )
        )
      )
    )
  )
}
