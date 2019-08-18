import fs from 'fs-extra';
import beautify from 'js-beautify';
import { generateContent } from './content';

const header = '/* provisioned by scola */';

export function generateFile(box, data, source, target) {
  let targetContent = null;

  try {
    targetContent = String(fs.readFileSync(target));
  } catch (e) {
    targetContent = header;
  }

  if (targetContent.slice(0, header.length) !== header) {
    box.unprovisioned.push(target.replace(process.cwd(), ''));
    return;
  }

  let sourceContent = String(fs.readFileSync(source));

  sourceContent = generateContent(sourceContent, data);
  sourceContent = header + '\n\n' + sourceContent;
  sourceContent = beautify.js(sourceContent, box.beautify);

  if (sourceContent === targetContent) {
    box.unchanged.push(target.replace(process.cwd(), ''));
  } else {
    box.changed.push(target.replace(process.cwd(), ''));
  }

  fs.ensureFileSync(target);
  fs.writeFileSync(target, sourceContent);
}
