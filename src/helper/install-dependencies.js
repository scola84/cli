import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import trim from 'lodash-es/trim';
import recursive from 'recursive-readdir';

const builtins = [
  '..',
  '.',
  'child_process',
  'cluster',
  'crypto',
  'fs',
  'http',
  'net',
  'os',
  'path',
  'process',
  'readline',
  'stream',
  'tls',
  'url',
  'util'
];

export function installDependencies(dir, options, callback) {
  recursive(process.cwd() + dir, (error, files) => {
    if (error) {
      callback(error.code === 'ENOENT' ? null : error);
      return;
    }

    try {
      install(files, options);
      callback();
    } catch (installError) {
      callback(installError);
    }
  });
}

function install(files, options = {}) {
  const modules = new Set();
  const self = process.cwd().split('/').slice(-2).join('/');

  files.forEach((file) => {
    const data = readFileSync(file);
    const matches = String(data).match(/^import ([^;]|\n)*;$/mg) || [];

    let module = null;
    let scope = null;

    matches.forEach((match) => {
      module = trim(match.slice(match.indexOf('\'')), ' \';');

      [scope, module] = module.split('/');

      module = module && scope.slice(0, 1) === '@' ?
        ([scope, module].join('/')) : scope;

      if (builtins.indexOf(module) === -1) {
        if (module !== self) {
          modules.add(module);
        }
      }
    });
  });

  const data = readFileSync(process.cwd() + '/package.json');
  const json = JSON.parse(String(data));

  if (options.reset === true) {
    delete json.dependencies;
  }

  writeFileSync(process.cwd() + '/package.json', JSON.stringify(json));

  const execOptions = { cwd: process.cwd(), stdio: 'inherit' };
  const names = Array.from(modules).sort();
  const skip = options.skip || '';

  names.forEach((name) => {
    if (skip.indexOf(name) === -1) {
      execSync(`npm install ${name}`, execOptions);
    }
  });

  execSync('npm install', execOptions);
}
