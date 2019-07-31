export function buildOption(b) {
  b.option().attributes({ value: '__VALUE__' }).text(
    b.print().format('__OBJECT_LC__.form.value.__COLUMN__.__VALUE__')
  );
}
