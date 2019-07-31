import { Router, Worker } from '@scola/worker';

import {
  app,
  pkg
} from './gen/';

export function gen(options) {
  const unifier = new Worker();

  const router = new Router({
    filter(box) {
      return box.type;
    }
  });

  router
    .connect('app', app(options))
    .connect(unifier);

  router
    .connect('pkg', pkg(options))
    .connect(unifier);

  return [router, unifier];
}
