export function checkbox (hb) {
  hb.checkbox()
    .attributes({
      name: '/*name*/'
    })
    .properties({
      checked: (box, data) => {
        const value = '/*options.value*/'
        return data['/*name*/'] === value
      },
      value: '/*options.value*/'
    })
}
