import { SqlBuilder } from '@scola/doc';

import {
  Router,
  Slicer,
  Unifier,
  Worker
} from '@scola/worker';

import findup from 'find-up';
import fs from 'fs-extra';
import beautify from 'js-beautify';
import groupBy from 'lodash-es/groupBy';
import Mustache from 'mustache';
import qs from 'qs';
import readDir from 'recursive-readdir';

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

  function merge(data) {
    data = groupBy(data, 'table');

    return Object.keys(data).map((table) => {
      const [object, link] = table.split('_');

      const columns = data[table].filter((column) => {
        return !column.pk;
      });

      const definition = {
        table,
        object,
        link,
        columns,
        search: [],
        default: [],
        order: []
      };

      definition.columns.forEach((column, index, all) => {
        column.comma = index < all.length - 1 ? ',' : '';
        column.options = qs.parse(column.options);

        if (column.options.default) {
          definition.default.push({
            name: column.name,
            direction: column.options.default
          });
        }

        if (column.options.order === '') {
          definition.order.push({
            name: column.name
          });
        }

        if (column.options.search === '') {
          definition.search.push({
            name: column.name
          });
        }
      });

      definition.default.forEach((column, index, all) => {
        column.comma = index < all.length - 1 ? ',' : '';
      });

      definition.order.forEach((column, index, all) => {
        column.comma = index < all.length - 1 ? ',' : '';
      });

      definition.search.forEach((column, index, all) => {
        column.comma = index < all.length - 1 ? ',' : '';
      });

      return definition;
    });
  }

  function mergeLink(data, result) {
    [result] = merge(result);

    data.search = result.search.map((column) => {
      column.link = data.link;
      return column;
    });

    data.default = result.default.map((column) => {
      column.link = data.link;
      return column;
    });

    data.order = result.order.map((column) => {
      column.link = data.link;
      return column;
    });

    return data;
  }

  const mysqlColumnSelector = new SqlBuilder({
    decide(box) {
      return box.host.indexOf('mysql') === 0;
    },
    host: 'mysql',
    merge(box, data, { result }) {
      return merge(result);
    }
  });

  const postgresqlColumnSelector = new SqlBuilder({
    decide(box) {
      return box.host.indexOf('postgres') === 0;
    },
    host: 'postgres',
    merge(box, data, { result }) {
      return merge(result);
    }
  });

  const mysqlLinkSelector = new SqlBuilder({
    decide(box) {
      return box.host.indexOf('mysql') === 0;
    },
    host: 'mysql',
    merge(box, data, { result }) {
      return mergeLink(data, result);
    }
  });

  const postgresqlLinkSelector = new SqlBuilder({
    decide(box) {
      return box.host.indexOf('postgres') === 0;
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

  const objectProcessor = new Worker({
    act(box, data, callback) {
      const header = '/* provisioned by scola */';

      const bdir = __dirname.slice(0, -5) + '/src/cli/gen/pkg';
      const sdir = bdir + '/template/object';
      const tdir = process.cwd();

      let options = findup
        .sync('.jsbeautifyrc.json');

      options = options ? JSON.parse(
        fs.readFileSync(options)
      ) : {};

      readDir(sdir, (error, files) => {
        files.forEach((source) => {
          let target = source
            .replace(sdir, tdir)
            .split('/');

          target
            .splice(-1, 0, box.object);

          target = target.join('/');

          let targetContent = null;

          try {
            targetContent = String(fs.readFileSync(target));
          } catch (e) {
            targetContent = header;
          }

          if (targetContent.slice(0, header.length) !== header) {
            return;
          }

          let sourceContent = String(fs.readFileSync(source));

          sourceContent = sourceContent
            .replace(/\n\s+(\/\*comma\*\/)/g, '$1');

          sourceContent = Mustache.render(
            sourceContent,
            data, {},
            ['/*', '*/']
          );

          sourceContent = sourceContent
            .replace(/\['(\w+)'\]/g, '.$1');

          sourceContent = header + '\n\n' + sourceContent;
          sourceContent = beautify.js(sourceContent, options);

          fs.ensureFileSync(target);
          fs.writeFileSync(target, sourceContent);
        });
      });

      this.pass(box, data, callback);
    }
  });

  const linkProcessor = new Worker({
    act(box, data, callback) {
      this.pass(box, data, callback);
    }
  });

  const router = new Router({
    filter(box, data) {
      return typeof data.link === 'undefined' ?
        'object' : 'link';
    }
  });

  query.mysql(mysqlColumnSelector, (box) => `%${box.object}%`);
  query.postgresql(postgresqlColumnSelector, (box) => `%${box.object}%`);

  query.mysql(mysqlLinkSelector, (box, data) => `${data.link}`);
  query.postgresql(postgresqlLinkSelector, (box, data) => `${data.link}`);

  mysqlColumnSelector
    .connect(postgresqlColumnSelector)
    .connect(slicer)
    .connect(router);

  router
    .connect('object', objectProcessor)
    .connect(unifier);

  router
    .connect('link', new Worker())
    .connect(mysqlLinkSelector)
    .connect(postgresqlLinkSelector)
    .connect(linkProcessor)
    .connect(unifier);

  return [mysqlColumnSelector, unifier];
}
