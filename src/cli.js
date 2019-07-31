import 'source-map-support/register';

import { setup as setupDoc } from '@scola/doc';
import { Router, Worker } from '@scola/worker';
import commander from 'commander';

import { exec } from './cli/exec';
import { gen } from './cli/gen';

setupDoc();

const beginner = new Worker();

const ender = new Worker({
  act() {
    process.exit();
  },
  err() {
    process.exit();
  }
});

const router = new Router({
  decide(box) {
    return box.error === true ? null : true;
  },
  filter(box) {
    return box.name;
  }
});

function action(options) {
  options.name = options._name;

  Worker.setLog((type, worker, box, data, callback, line) => {
    if (type === 'cmd' && options.log.indexOf(type) > -1) {
      console.log(line);
    }
  });

  beginner
    .connect(router
      .bypass(ender));

  router
    .connect('exec', exec(options))
    .connect(ender);

  router
    .connect('gen', gen(options))
    .connect(ender);

  beginner.handle(options);
}

commander
  .command('exec')
  .description('Execute commands')
  .option('-c, --command <command>', 'The command to be executed')
  .option('-d, --directory <directory>', 'The directory filter')
  .option('-l, --log <log>', 'The log filter', 'fail,cmd')
  .option('-r, --recursive', 'Whether to execute the command recursively')
  .action(action);

commander
  .command('gen')
  .description('Generate code')
  .option('-d, --database <database>', 'The database to generate code from')
  .option('-h, --host <host>', 'The host of the database')
  .option('-l, --log <log>', 'The log filter', 'fail,cmd')
  .option('-o, --object <object>', 'The object to generate code for')
  .option('-t, --type <type>', 'The type of code to be generated')
  .action(action);

commander
  .parse(process.argv);

if (process.argv.length === 2) {
  commander.help();
}
