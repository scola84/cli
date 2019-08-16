import { generateFile } from './file';

export function generateCustom(box, data, callback) {
  const sdir = __dirname.slice(0, -5) +
    '/src/cli/gen/pkg/template';

  const tdir = process.cwd();

  const files = [{
    source: sdir + '/index/api.js',
    target: tdir + '/api/index.js'
  }, {
    source: sdir + '/index/gui.js',
    target: tdir + '/gui/index.js'
  }, {
    source: sdir + '/index/query.js',
    target: tdir + '/api/query/index.js'
  }, {
    source: sdir + '/index/view.js',
    target: tdir + '/gui/view/index.js'
  }, {
    source: sdir + '/locale/index.js',
    target: tdir + '/cmn/locale/index.js'
  }, {
    source: sdir + '/locale/nl_NL.js',
    target: tdir + '/cmn/locale/nl_NL.js'
  }];

  data = {
    items: data
  };

  files.forEach(({ source, target }) => {
    generateFile(box, data, source, target);
  });

  callback();
}
