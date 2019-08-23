import { snippet } from '@scola/dom'

snippet.Print.addStrings({
  nl_NL: {
    '/*object*/': {
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
        item: {
          l1: '%(/*object*/_id)s'
        }
      },
      title: {
        1: '/*object*/',
        d: '/*object*/'
      },
      view: {
        actions: {
          button: {
            edit: 'edit',
            link: 'link'
          }
        },
        properties: {
          /* #each groups */
          /* #each fields */
          /* #if options.property */
          '/*name*/': {
            l0: '/*name*/',
            l1: '%(/*name*/)s'
          }/* comma */
          /* /if */
          /* /each */
          /* /each */
        }
      }
    }
  }
})
