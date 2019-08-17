import { Worker } from '@scola/worker';
import { execSync } from 'child_process';

const alias = {
  branch: 'git status | head -n 1',
  changes: 'git status -s',
  cdeps: [
    'git add package.json',
    'git commit -m "Update dependencies"'
  ],
  ideps: 'scola exec -c install',
  log: 'git log | head -n 5 | tail -n 1',
  major: [
    'npm version major',
    'npm publish',
    'git push --follow-tags'
  ],
  minor: [
    'npm version minor',
    'npm publish',
    'git push --follow-tags'
  ],
  patch: [
    'npm version patch',
    'npm publish',
    'push'
  ],
  push: 'git push --follow-tags'
};

export function custom() {
  function resolve(command) {
    command = alias[command] || command;

    return Array.isArray(command) ? command.map((cmd) => {
      return resolve(cmd);
    }).join(' && ') : command;
  }

  return new Worker({
    act(box, data, callback) {
      const command = resolve(box.command);

      this.log('cmd', box, data, callback, `${data}$ ${command}`);

      try {
        execSync(command, { cwd: data, stdio: 'inherit' });
      } catch (error) {
        data = error;
      }

      console.log();

      this.pass(box, data, callback);
    }
  });
}
