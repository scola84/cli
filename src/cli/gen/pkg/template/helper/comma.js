export function comma(context) {
  if (context.hash.always === true) {
    return ',';
  }

  let parent = context.data;
  let isLast = parent.last;

  while (parent) {
    if (parent.last) {
      isLast = isLast && true;
    }

    parent = parent._parent;
  }

  return isLast ? '' : ',';
}
