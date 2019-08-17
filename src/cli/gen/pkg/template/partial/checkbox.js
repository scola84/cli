export function checkbox(v) {
  v.checkbox()
    .attributes({
      name: '/*name*/'
    })
    .properties({
      checked: (box, data) => {
        const value = '/*options.value*/';
        return data['/*name*/'] === value;
      },
      value: '/*options.value*/'
    });
}
