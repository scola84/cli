import { installDependencies } from '../../helper'
import { Worker } from '@scola/worker'

export function install () {
  return new Worker({
    act (box, data, callback) {
      const options = {
        reset: true,
        skip: box.skip
      }

      installDependencies('/src', options, (error) => {
        if (error) {
          this.fail(box, error, callback)
        } else {
          this.pass(box, data, callback)
        }
      })
    }
  })
}
