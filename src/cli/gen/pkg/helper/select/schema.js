export function selectSchema(box) {
  return `${box.host.split('/').pop()}`;
}
