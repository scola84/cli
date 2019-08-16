import { snippet } from '@scola/dom';
import * as locale from '../cmn/locale';
import * as view from './view';

export function setup(router, resolver) {
  snippet.Print.addStrings(locale);

  Object.keys(view).forEach((name) => {
    view[name](router, resolver);
  });
}
