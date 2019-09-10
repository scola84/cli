export function checkbox (vb) {
  vb.checkbox()
    .attributes({
      name: '/*name*/'
    })
    .properties({
      checked: (route, data) => {
        const value = '/*options.value*/'
        return data['/*name*/'] === value
      },
      value: '/*options.value*/'
    })
}
