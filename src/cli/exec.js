import { Router, Slicer, Unifier } from '@scola/worker';
import { collectDirectories } from '../helper';

import {
  custom,
  install
} from './exec/';

export function exec() {
  const unifier = new Unifier();

  const router = new Router({
    filter(box) {
      return this._downstreams[box.command] ?
        box.command : 'custom';
    }
  });

  const slicer = new Slicer({
    filter(box) {
      return collectDirectories(box.filter, box.recursive);
    }
  });

  slicer
    .bypass(unifier)
    .connect(router);

  router
    .connect('install', install())
    .connect(unifier);

  router
    .connect('custom', custom())
    .connect(unifier);

  return [slicer, unifier];
}
