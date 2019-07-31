import './src/style/__OBJECT_LC__.css';

import { snippet } from '@scola/dom';
import { route__OBJECT_UC__ } from './src/route/__OBJECT_LC__';
import * as locale from '../cmn/src/locale';

export function setup(router) {
  snippet.Print.addStrings(locale);
  route__OBJECT_UC__(router);
}
