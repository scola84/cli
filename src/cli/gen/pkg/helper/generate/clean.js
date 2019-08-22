import fs from 'fs-extra';

function rmdir(box, path, prefix = path) {
  const header = '/* provisioned by scola */';
  const files = fs.readdirSync(path);

  files.sort().forEach((file) => {
    file = `${path}/${file}`;

    if (fs.lstatSync(file).isDirectory()) {
      rmdir(box, file, prefix);
    } else {
      const content = String(fs.readFileSync(file));

      if (content.slice(0, header.length) === header) {
        box.cleaned.push(file.replace(prefix, ''));

        if (Boolean(box.dryRun) === false) {
          fs.unlinkSync(file);
        }
      }
    }
  });

  try {
    fs.rmdirSync(path);
  } catch (e) {
    //
  }
}

export function generateClean(box, callback) {
  rmdir(box, process.cwd());
  callback();
}
