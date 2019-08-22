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

  console.out = (type, worker, box, data, line) => {
    if (type === 'cli') {
      console.log(line);
    } else if (type === 'fail' && !data.logged) {
      data.logged = true;

      if (data.message.slice(0, 5) === 'scola') {
        console.error(data.message);
      } else {
        console.error(data);
      }
    }
  };

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
  .option('-d, --dry-run', 'Whether to dry run the command')
  .option('-f, --filter <filter>', 'The directory filter')
  .option('-r, --recursive', 'Whether to execute the command recursively')
  .option('-s, --skip <skip>', 'Items to skip')
  .action(action);

commander
  .command('gen')
  .description('Generate code')
  .option('-c, --clean', 'Whether to clean provisioned files')
  .option('-d, --dry-run', 'Whether to dry run the generation')
  .option('-h, --host <host>', 'The host of the database')
  .option('-o, --object <object>', 'The object to generate code for')
  .option('-t, --type <type>', 'The type of code to be generated')
  .action(action);

commander
  .parse(process.argv);

if (process.argv.length === 2) {
  commander.help();
}
