import { SqlBuilder } from '@scola/doc';

import {
  Slicer,
  Unifier,
  Worker
} from '@scola/worker';

import findup from 'find-up';
import fs from 'fs-extra';

import {
  generateAcg,
  generateCustom,
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

  const customGenerator = new Worker({
    act(box, data, callback) {
      generateCustom(box, data, () => {
        this.pass(box, data, callback);
      });
    }
  });

  const linkGenerator = new Worker({
    decide(box, data) {
      return typeof data.link !== 'undefined';
    },
    act(box, data, callback) {
      generateAcg(box, data, () => {
        this.pass(box, data, callback);
      }, 'link');
    }
  });

  const objectGenerator = new Worker({
    decide(box, data) {
      return typeof data.link === 'undefined';
    },
    act(box, data, callback) {
      generateAcg(box, data, () => {
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
