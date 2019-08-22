import '../cmn/locale';
import * as query from './query';

export function setup(router, resolver) {
  Object.keys(query).forEach((name) => {
    query[name](router, resolver);
  });
}
