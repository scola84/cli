import { formatEmail } from './email';
import { formatSelect } from './select';

export default {
  'enum': formatSelect,
  'varchar\\(254\\)': formatEmail
};
