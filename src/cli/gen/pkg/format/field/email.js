import { extractBody } from '../extract';

export function formatEmail(column, options) {
  return extractBody(options.bdir + '/build/input/email.js');
}
