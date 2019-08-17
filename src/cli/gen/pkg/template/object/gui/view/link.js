import { ViewBuilder } from '@scola/dom';
import { buildAside } from '../../../cmn/view//*object*//link/aside';
import { buildLinkCore } from '../../../cmn/view//*object*//link';

export function buildLink() {
  const v = new ViewBuilder();

  v.build(
    v.panel(
      v.header(
        v.bar(
          v.left(
            v.click(
              v.button().class('icon ion-ios-arrow-back').text(
                v.print().format('button.back')
              )
            ).act(
              v.route().view('view-/*object*/:{/*object*/_id}@main:bwd&ltr')
            )
          ),
          v.center(
            v.title().text(
              v.print().format('title.link')
            )
          )
        ),
        v.message(),
        v.progress()
      ),
      v.body(
        buildLinkCore(v),
        buildAside(v)
      )
    )
  );

  return v;
}
