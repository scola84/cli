import { ViewBuilder } from '@scola/dom';

export function buildVoid() {
  const b = new ViewBuilder();

  const p = b.panel(
    b.header(
      b.bar(
        b.center(
          b.title().text(
            b.print().format('__OBJECT_LC__.title.1')
          )
        )
      )
    ),
    b.body().class('message').text(
      b.print().format('__OBJECT_LC__.void.message')
    )
  );

  return b.build(p);
}
