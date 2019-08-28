import { Router, Slicer, Unifier } from '@scola/worker'
import { readdirSync } from 'fs'

import {
  custom,
  install
} from './exec/'

export function exec () {
  const unifier = new Unifier()

  const router = new Router({
    filter (box) {
      return this._downstreams[box.command]
        ? box.command : 'custom'
    }
  })

  const slicer = new Slicer({
    filter (box) {
      const cwd = process.cwd()

      if (box.recursive !== true) {
        return [cwd]
      }

      return readdirSync(cwd).map((item) => {
        return cwd + '/' + item
      })
    }
  })

  slicer
    .bypass(unifier)
    .connect(router)

  router
    .connect('install', install())
    .connect(unifier)

  router
    .connect('custom', custom())
    .connect(unifier)

  return [slicer, unifier]
}
