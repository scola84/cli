export function buildNew (v) {
  return v.group().class('new').append(
    v.title().text(
      v.print().format('/*object*/.link./*link*/.title.new')
    ),
    v.hint().format('/*object*/.link./*link*/.form.hint./*link*/_id'),
    v.body(
      v.getList().name('/*link*/').append(
        v.list().empty(
          v.item().class('empty').append(
            v.radio().wrap().attributes({
              name: '/*link*/_id',
              required: 'required'
            }),
            v.label(
              v.div().class('l1').text(
                v.print().format('message.nodata')
              )
            )
          )
        ).append(
          v.item().name('label').class('click').append(
            v.radio().wrap().attributes({
              name: '/*link*/_id',
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
      ),
      v.loading()
    )
  )
}
