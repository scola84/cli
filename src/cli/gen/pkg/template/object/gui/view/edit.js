import { ViewBuilder } from '@scola/dom'
import { buildFieldset } from '../../../cmn/view//*object*//fieldset'

export function buildEdit () {
  const v = new ViewBuilder()

  v.build(
    v.panel(
      v.header(
        v.bar(
          v.left(
            v.click(
              v.button().text(
                v.print().format('button.cancel')
              )
            ).act(
              v.route().view('@self:clr')
            )
          ),
          v.center(
            v.title().text(
              v.print().format('/*object*/.title.1')
            )
          ),
          v.right(
            v.button().form('edit').text(
              v.print().format('button.save')
            )
          )
        ),
        v.message(),
        v.progress()
      ),
      v.body(
        v.submit(
          v.form().id('edit').append(
            v.getObject().name('/*object*/').append(
              buildFieldset(v)
            )
          )
        ).act(
          v.validate(
            v.selector('.body form')
          ).act(
            v.putObject().name('/*object*/')
          ).err(
            v.selector('.body .hint')
          )
        ),
        v.group(
          v.click(
            v.item(
              v.button().class('delete').text(
                v.print().format('button.delete')
              )
            )
          ).act(
            v.deleteObject().name('/*object*/')
          )
        )
      )
    )
  )

  return v
}
