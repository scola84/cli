import { SqlBuilder } from '@scola/doc';

import {
  Slicer,
  Unifier,
  Worker
} from '@scola/worker';

import {
  generate,
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

  const generator = new Worker({
    act(box, data, callback) {
      generate(box, data, () => {
        this.pass(box, data, callback);
      });
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

  mysqlObjectSelector
    .connect(postgresqlObjectSelector)
    .connect(slicer)
    .connect(mysqlLinkSelector)
    .connect(postgresqlLinkSelector)
    .connect(generator)
    .connect(unifier);

  return [mysqlObjectSelector, unifier];
}
