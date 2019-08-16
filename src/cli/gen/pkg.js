import { SqlBuilder } from '@scola/doc';

import {
  Slicer,
  Unifier,
  Worker
} from '@scola/worker';

import findup from 'find-up';
import fs from 'fs-extra';
import Handlebars from 'handlebars';
import readDir from 'recursive-readdir';

import {
  generateContent,
  generateDir,
  mergeLink,
  mergeObject
} from './pkg/helper';

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

  const handleBars = new Worker({
    act(box, data, callback) {
      Handlebars.registerHelper('comma', (context) => {
        return (
          context.hash.always !== true &&
          context.data.last === true && (
            context.data._parent.last === true ||
            typeof context.data._parent.last === 'undefined'
          )
        ) ? '' : ',';
      });

      const sdir = __dirname.slice(0, -5) +
        '/src/cli/gen/pkg/template/partial/';

      readDir(sdir, (error, files) => {
        files.forEach((file) => {
          Handlebars.registerPartial(
            file.split('/').pop().slice(0, -3),
            (context) => {
              let content = String(fs.readFileSync(file))
                .split(/\r?\n/);

              let begin = 0;
              let end = void 0;

              for (let i = 0; i < content.length; i += 1) {
                if (content[i].slice(0, 6) === 'export') {
                  begin = i + 1;
                  end = -2;
                  break;
                }
              }

              content = content
                .slice(begin, end)
                .join('\n');

              if (begin) {
                content = content.split('');
                content.splice(content.lastIndexOf(';'), 1);
                content = content.join('');
              }

              return generateContent(content, context);
            }
          );
        });

        this.pass(box, data, callback);
      });
    }
  });

  const customGenerator = new Worker({
    act(box, data, callback) {
      generateDir(box, { data }, () => {
        this.pass(box, data, callback);
      }, 'master');
    }
  });

  const linkGenerator = new Worker({
    decide(box, data) {
      return typeof data.link !== 'undefined';
    },
    act(box, data, callback) {
      generateDir(box, data, () => {
        this.pass(box, data, callback);
      }, 'link');
    }
  });

  const objectGenerator = new Worker({
    decide(box, data) {
      return typeof data.link === 'undefined';
    },
    act(box, data, callback) {
      generateDir(box, data, () => {
        this.pass(box, data, callback);
      }, 'object');
    }
  });

  const optionsFinder = new Worker({
    act(box, data, callback) {
      const options = findup
        .sync('.jsbeautifyrc.json');

      box.beautify = options ? JSON.parse(
        fs.readFileSync(options)
      ) : {};

      this.pass(box, data, callback);
    }
  });

  const mysqlObjectSelector = new SqlBuilder({
    decide(box) {
      return box.host.indexOf('mysql') === 0;
    },
    host: 'mysql',
    merge(box, data, { result }) {
      return mergeObject(result);
    }
  });

  const mysqlLinkSelector = new SqlBuilder({
    decide(box, data) {
      return (
        box.host.indexOf('mysql') === 0 &&
        typeof data.link !== 'undefined'
      );
    },
    host: 'mysql',
    merge(box, data, { result }) {
      return mergeLink(data, result);
    }
  });

  const postgresqlObjectSelector = new SqlBuilder({
    decide(box) {
      return box.host.indexOf('postgres') === 0;
    },
    host: 'postgres',
    merge(box, data, { result }) {
      return mergeObject(result);
    }
  });

  const postgresqlLinkSelector = new SqlBuilder({
    decide(box, data) {
      return (
        box.host.indexOf('postgresql') === 0 &&
        typeof data.link !== 'undefined'
      );
    },
    host: 'postgres',
    merge(box, data, { result }) {
      return mergeLink(data, result);
    }
  });

  const slicer = new Slicer({
    name: 'table'
  });

  const unifier = new Unifier({
    name: 'table'
  });

  query.mysql(mysqlObjectSelector, (box) => `%${box.object}%`);
  query.postgresql(postgresqlObjectSelector, (box) => `%${box.object}%`);

  query.mysql(mysqlLinkSelector, (box, data) => `${data.link}`);
  query.postgresql(postgresqlLinkSelector, (box, data) => `${data.link}`);

  optionsFinder
    .connect(handleBars)
    .connect(mysqlObjectSelector)
    .connect(postgresqlObjectSelector)
    .connect(customGenerator)
    .connect(slicer)
    .connect(mysqlLinkSelector)
    .connect(postgresqlLinkSelector)
    .connect(objectGenerator)
    .connect(linkGenerator)
    .connect(unifier);

  return [optionsFinder, unifier];
}
