import fs from 'fs-extra';
import beautify from 'js-beautify';
import { generateContent } from './content';

export function generateFile(box, data, source, target) {
  const header = '/* provisioned by scola */';
  const name = target.replace(process.cwd(), '');

  let targetContent = null;

  try {
    targetContent = String(fs.readFileSync(target));
  } catch (e) {
    targetContent = header;
  }

  if (targetContent.slice(0, header.length) !== header) {
    box.unprovisioned.push(name);
    return;
  }

  let sourceContent = String(fs.readFileSync(source));

  try {
    sourceContent = generateContent(sourceContent, data);
  } catch (error) {
    box.failed.push(name);
    return;
  }

  sourceContent = header + '\n\n' + sourceContent;
  sourceContent = beautify.js(sourceContent, box.beautify);

  if (sourceContent === targetContent) {
    box.unchanged.push(name);
  } else {
    box.changed.push(name);
  }

  if (Boolean(box.dryRun) === false) {
    fs.ensureFileSync(target);
    fs.writeFileSync(target, sourceContent);
  }
}
