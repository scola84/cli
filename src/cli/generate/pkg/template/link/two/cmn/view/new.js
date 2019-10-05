export function buildNew (hb) {
  return hb.group().class('new').append(
    hb.title().text(
      hb.print().format('/*object*/.link./*link*/.title.new')
    ),
    hb.hint().format('/*object*/.link./*link*/.form.hint./*link*/_id'),
    hb.body(
      hb.getList().name('/*link*/').append(
        hb.list().empty(
          hb.item().class('empty').append(
            hb.radio().wrap().attributes({
              name: '/*link*/_id',
              required: 'required'
            }),
            hb.label(
              hb.div().class('l1').text(
                hb.print().format('message.nodata')
              )
            )
          )
        ).append(
          hb.item().name('label').class('click').append(
            hb.radio().wrap().attributes({
              name: '/*link*/_id',
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
      ),
      hb.loading()
    )
  )
}
