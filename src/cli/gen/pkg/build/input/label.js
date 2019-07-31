export function buildLabel(b) {
  b.label(
    b.div().class('l1').text(
      b.print().format('__OBJECT_LC__.form.label.__COLUMN__')
    )
  );
}
