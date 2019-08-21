import fs from 'fs-extra';
import readDir from 'recursive-readdir';

const header = '/* provisioned by scola */';

export function generateClean(callback) {
  readDir(process.cwd(), (error, files) => {
    files.forEach((file) => {
      const content = String(fs.readFileSync(file));

      if (content.slice(0, header.length) === header) {
        fs.unlinkSync(file);

        try {
          fs.rmdirSync(file.split('/').slice(0, -1).join('/'));
        } catch (e) {
          //
        }
      }
    });

    callback();
  });
}
