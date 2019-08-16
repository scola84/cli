import fs from 'fs-extra';
import beautify from 'js-beautify';
import Mustache from 'mustache';

export function generateFile(box, data, source, target) {
  const header = '/* provisioned by scola */';

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
    data,
    ({}),
    ['/*', '*/']
  );

  sourceContent = sourceContent
    .replace(/\['(\w+)'\]/g, '.$1');

  sourceContent = header + '\n\n' + sourceContent;
  sourceContent = beautify.js(sourceContent, box.beautify);

  fs.ensureFileSync(target);
  fs.writeFileSync(target, sourceContent);
}
