export function buildNew (vb) {
  return vb.group().class('new').append(
    vb.title().text(
      vb.print().format('/*object*/.link./*link*/.title.new')
    ),
    vb.hint().format('/*object*/.link./*link*/.form.hint./*link*/_id'),
    vb.body(
      vb.getList().name('/*link*/').append(
        vb.list().empty(
          vb.item().class('empty').append(
            vb.radio().wrap().attributes({
              name: '/*link*/_id',
              required: 'required'
            }),
            vb.label(
              vb.div().class('l1').text(
                vb.print().format('message.nodata')
              )
            )
          )
        ).append(
          vb.item().name('label').class('click').append(
            vb.radio().wrap().attributes({
              name: '/*link*/_id',
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
      ),
      vb.loading()
    )
  )
}
