import findup from 'find-up';
import fs from 'fs-extra';
import beautify from 'js-beautify';
import Mustache from 'mustache';
import readDir from 'recursive-readdir';

export function generate(box, data, callback) {
  const header = '/* provisioned by scola */';

  const sdir = __dirname.slice(0, -5) +
    '/src/cli/gen/pkg/template/' +
    (data.link ? 'link' : 'object');

  const tdir = process.cwd();

  let options = findup
    .sync('.jsbeautifyrc.json');

  options = options ? JSON.parse(
    fs.readFileSync(options)
  ) : {};

  readDir(sdir, (error, files) => {
    files.forEach((source) => {
      let target = source
        .replace(sdir, tdir)
        .split('/');

      target
        .splice(-1, 0, data.link ? data.link : data.object);

      target = target.join('/');

      let targetContent = null;

      try {
        targetContent = String(fs.readFileSync(target));
      } catch (e) {
        targetContent = header;
      }

      if (targetContent.slice(0, header.length) !== header) {
        return;
      }

      let sourceContent = String(fs.readFileSync(source));

      sourceContent = sourceContent
        .replace(/\n\s+(\/\*comma\*\/)/g, '$1');

      sourceContent = Mustache.render(
        sourceContent,
        data, {},
        ['/*', '*/']
      );

      sourceContent = sourceContent
        .replace(/\['(\w+)'\]/g, '.$1');

      sourceContent = header + '\n\n' + sourceContent;
      sourceContent = beautify.js(sourceContent, options);

      fs.ensureFileSync(target);
      fs.writeFileSync(target, sourceContent);
    });

    callback();
  });
}
