import readDir from 'recursive-readdir';
import { generateFile } from './file';

export function generateAcg(box, data, callback, type) {
  const sdir = __dirname.slice(0, -5) +
    '/src/cli/gen/pkg/template/' +
    type;

  const tdir = process.cwd();

  readDir(sdir, (error, files) => {
    files.forEach((source) => {
      let target = source
        .replace(sdir, tdir)
        .split('/');

      target
        .splice(-1, 0, data[type]);

      target = target.join('/');

      generateFile(box, data, source, target);
    });

    callback();
  });
}
