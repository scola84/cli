import { SqlBuilder } from '@scola/doc';

import {
  Router,
  Slicer,
  Unifier,
  Worker
} from '@scola/worker';

import fs from 'fs-extra';
import beautify from 'js-beautify';
import upperFirst from 'lodash-es/upperFirst';
import qs from 'qs';
import readDir from 'recursive-readdir';

import {
  formatInput,
  formatList
} from './pkg/format';

import * as query from './pkg/query';

export function pkg() {
  SqlBuilder.setHosts({
    mysql: (box) => {
      return {
        dialect: 'mysql',
        host: box.host,
        dsn: box.host
      };
    },
    postgres: (box) => {
      return {
        dialect: 'postgresql',
        host: box.host,
        dsn: box.host
      };
    }
  });

  const mysqlTableSelector = new SqlBuilder({
    decide(box) {
      return box.host.indexOf('mysql') === 0;
    },
    host: 'mysql',
    merge(box, data, { result }) {
      return result;
    }
  });

  const mysqlColumnSelector = new SqlBuilder({
    decide(box) {
      return box.host.indexOf('mysql') === 0;
    },
    host: 'mysql',
    merge(box, data, { result }) {
      data.columns = result;
      return data;
    }
  });

  const postgresqlTableSelector = new SqlBuilder({
    decide(box) {
      return box.host.indexOf('postgres') === 0;
    },
    host: 'postgres',
    merge(box, data, { result }) {
      return result;
    }
  });

  const postgresqlColumnSelector = new SqlBuilder({
    decide(box) {
      return box.host.indexOf('postgres') === 0;
    },
    host: 'postgres',
    merge(box, data, { result }) {
      data.columns = result;
      return data;
    }
  });

  const tableSlicer = new Slicer({
    name: 'table'
  });

  const tableUnifier = new Unifier({
    name: 'table'
  });

  const objectProcessor = new Worker({
    act(box, data, callback) {
      console.log('object', data);
      this.pass(box, data, callback);
    }
  });

  const linkProcessor = new Worker({
    act(box, data, callback) {
      console.log('link', data);
      this.pass(box, data, callback);
    }
  });

  const router = new Router({
    decide(box, data) {
      return typeof data.name === 'string' ?
        true : null;
    },
    filter(box, data) {
      return data.name.indexOf('_') === -1 ?
        'object' : 'link';
    }
  });

  query.mysql.column(mysqlColumnSelector);
  query.mysql.table(mysqlTableSelector);
  query.postgresql.column(postgresqlColumnSelector);
  query.postgresql.table(postgresqlTableSelector);

  mysqlTableSelector
    .connect(postgresqlTableSelector)
    .connect(tableSlicer)
    .connect(mysqlColumnSelector)
    .connect(postgresqlColumnSelector)
    .connect(
      router.bypass(tableUnifier)
    );

  router
    .connect('object', objectProcessor)
    .connect(tableUnifier);

  router
    .connect('link', linkProcessor)
    .connect(tableUnifier);

  return [mysqlTableSelector, tableUnifier];

  //
  // const processor = new Worker({
  //   act(box, data, callback) {
  //     const bdir = __dirname.slice(0, -5) + '/src/cli/gen/pkg';
  //     const sdir = bdir + '/template';
  //     const tdir = process.cwd();
  //
  //     const object = box.object;
  //     const objectLc = object;
  //     const objectUc = upperFirst(objectLc);
  //
  //     const header = '/* provisioned by scola */';
  //
  //     const options = {
  //       bdir,
  //       sdir,
  //       tdir,
  //       object
  //     };
  //
  //     const columns = data.data.map((column) => {
  //       column.options = qs.parse(column.COLUMN_COMMENT);
  //       return column;
  //     });
  //
  //     readDir(sdir, (error, files) => {
  //       files.forEach((source) => {
  //         const target = source
  //           .replace(sdir, tdir)
  //           .replace(/object/g, objectLc);
  //
  //         let targetContent = null;
  //
  //         try {
  //           targetContent = String(fs.readFileSync(target));
  //         } catch (e) {
  //           targetContent = header;
  //         }
  //
  //         if (targetContent.slice(0, header.length) !== header) {
  //           return;
  //         }
  //
  //         let sourceContent = String(fs.readFileSync(source));
  //
  //         if (/list\.js$/.test(source)) {
  //           sourceContent = formatList(sourceContent, columns, options);
  //         }
  //
  //         if (/input\.js$/.test(source)) {
  //           sourceContent = formatInput(sourceContent, columns, options);
  //         }
  //
  //         sourceContent = sourceContent
  //           .replace(/__OBJECT_LC__/g, objectLc)
  //           .replace(/__OBJECT_UC__/g, objectUc);
  //
  //         sourceContent = header + '\n\n' + sourceContent;
  //
  //         sourceContent = beautify.js(sourceContent, {
  //           brace_style: 'collapse-preserve-inline',
  //           end_with_newline: true,
  //           indent_size: 2,
  //           max_preserve_newlines: 2
  //         });
  //
  //         fs.ensureFileSync(target);
  //         fs.writeFileSync(target, sourceContent);
  //       });
  //
  //       this.pass(box, data, callback);
  //     });
  //
  //   }
  // });
}
