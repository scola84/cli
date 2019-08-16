import fs from 'fs-extra';
import beautify from 'js-beautify';
import { generateContent } from './content';

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

  sourceContent = generateContent(sourceContent, data);
  sourceContent = header + '\n\n' + sourceContent;
  sourceContent = beautify.js(sourceContent, box.beautify);

  fs.ensureFileSync(target);
  fs.writeFileSync(target, sourceContent);
}
