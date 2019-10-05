export function buildCurrent (hb) {
  return hb.group().class('current').append(
    hb.title().text(
      hb.print().format('/*object*/.link./*link*/.title.current')
    ),
    hb.body(
      hb.item(
        hb.click(
          hb.button().class('click delete ion-ios-remove-circle')
        ).act(
          hb.deleteObject().name('/*object*/', '/*link*/')
        ),
        hb.radio().wrap().attributes({
          name: '/*link*/_id',
          checked: 'checked',
          required: 'required',
          value: (box, data) => data['/*link*/_id']
        }),
        hb.label(
          hb.div().class('l1').text(
            hb.print().format('/*object*/.link./*link*/.list.item.l1')
          ),
          hb.div().class('l2').text(
            hb.print().format('/*object*/.link./*link*/.list.item.l2')
          ),
          hb.div().class('l3').text(
            hb.print().format('/*object*/.link./*link*/.list.item.l3')
          ),
          hb.div().class('l4').text(
            hb.print().format('/*object*/.link./*link*/.list.item.l4')
          ),
          hb.div().class('l5').text(
            hb.print().format('/*object*/.link./*link*/.list.item.l5')
          )
        )
      )
    )
  )
}
