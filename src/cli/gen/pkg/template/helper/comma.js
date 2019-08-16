export function comma(context) {
  return (
    context.hash.always !== true &&
    context.data.last === true && (
      context.data._parent.last === true ||
      typeof context.data._parent.last === 'undefined'
    )
  ) ? '' : ',';
}
