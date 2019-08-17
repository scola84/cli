import readDir from 'recursive-readdir';
import { generateFile } from './file';
import { generateOptions } from './options';

export function generateDir(box, data, callback, type) {
  const sdir = __dirname.slice(0, -5) +
    '/src/cli/gen/pkg/template/' +
    type;

  const tdir = process.cwd();

  generateOptions(box, data, tdir, () => {
    readDir(sdir, (error, files) => {
      files.forEach((source) => {
        let target = source
          .replace(sdir, tdir)
          .split('/');

        const section = ['api', 'cmn', 'gui'].find((sct) => {
          return target.indexOf(sct) > -1;
        });

        if (data[type]) {
          target.splice(target.indexOf(section) + 2, 0, data[type]);
        }

        target = target.join('/');

        generateFile(box, data, source, target);
      });

      callback();
    });
  });
}
