import { snippet } from '@scola/dom';
import * as locale from '../cmn/locale';
import * as query from './query';

export function setup(router, resolver) {
  snippet.Print.addStrings(locale);

  Object.keys(query).forEach((name) => {
    query[name](router, resolver);
  });
}
