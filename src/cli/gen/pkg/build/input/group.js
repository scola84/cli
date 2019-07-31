export function buildGroup(b) {
  b.group(
    b.title().text(
      b.print().format('__OBJECT_LC__.form.title.__TITLE__')
    ),
    b.body(
      '__INPUT__'
    )
  );
}
