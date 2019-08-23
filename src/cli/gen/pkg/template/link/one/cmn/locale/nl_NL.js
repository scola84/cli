import { snippet } from '@scola/dom'

snippet.Print.addStrings({
  nl_NL: {
    '/*object*/': {
      link: {
        '/*link*/': {
          form: {
            hint: {
            },
            label: {
              /* #each groups */
              /* #each fields */
              '/*name*/': '/*name*/'/* comma */
              /* /each */
              /* /each */
            },
            title: {
              /* #each groups */
              /* #unlessEq name compare="default" */
              '/*name*/': '/*name*/'/* comma */
              /* /unlessEq */
              /* /each */
            },
            value: {
              /* #each groups */
              /* #each fields */
              /* #each values */
              '/*value*/': '/*value*/'/* comma */
              /* /each */
              /* /each */
              /* /each */
            }
          },
          list: {
            button: {
              link: 'link',
              list: 'list'
            },
            item: {
              l1: '%(/*link*/_id)s'
            }
          },
          title: {
            1: '/*link*/',
            d: '/*link*/'
          }
        }
      }
    }
  }
})
