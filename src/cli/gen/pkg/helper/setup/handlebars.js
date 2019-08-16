import Handlebars from 'handlebars';
import readDir from 'recursive-readdir';
import * as helper from '../../template/helper';
import { generatePartial } from '../generate';

export function setupHandlebars(box, data, callback) {
  Object.keys(helper).forEach((name) => {
    Handlebars.registerHelper(name, helper[name]);
  });

  const sdir = __dirname.slice(0, -5) +
    '/src/cli/gen/pkg/template/partial/';

  readDir(sdir, (error, files) => {
    files.forEach((file) => {
      Handlebars.registerPartial(
        file.split('/').pop().slice(0, -3),
        (context) => generatePartial(file, context)
      );
    });

    callback();
  });
}
