import { ViewBuilder } from '@scola/dom';

export function buildView() {
  const b = new ViewBuilder();

  const p = b.panel(
    b.header(
      b.bar(
        b.left(
          b.button().menu()
        ),
        b.center(
          b.title().text(
            b.print().format('__OBJECT_LC__.title.1')
          )
        )
      ),
      b.message(),
      b.progress()
    ),
    b.request().resource('/api/__OBJECT_LC__').object().indicator(
      b.selector('.progress')
    ).act(
      b.selector('.message'),
      b.selector('.body')
    ).err(
      b.selector('.message')
    ).append(
      b.body(

      )
    )
  );

  return b.build(p);
}
