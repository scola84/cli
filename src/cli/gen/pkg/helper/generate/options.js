import readDir from 'recursive-readdir';
import { extractBody } from '../../../../../helper';

export function generateOptions(box, data, tdir, callback) {
  if (typeof data.name === 'undefined') {
    callback();
    return;
  }

  const dir = tdir + `/cmn/view/${data.name}/fieldset`;

  readDir(dir, (error, files) => {
    if (error) {
      callback();
      return;
    }

    data.custom = true;

    files.forEach((file) => {
      const [name, tail] = file.split('/').slice(-2);

      if (name === 'fieldset' || tail !== 'index.js') {
        return;
      }

      let field = null;

      data.groups.forEach((group) => {
        group.fields.forEach((fld) => {
          if (fld.name === name) {
            field = fld;
          }
        });
      });

      if (field === null) {
        return;
      }

      extractBody(file).content.forEach((value) => {
        value = value.replace(',', '').trim();
        field.options[value] = true;
      });
    });

    callback();
  });
}
