import { SqlBuilder } from '@scola/doc';

import {
  Slicer,
  Unifier,
  Worker
} from '@scola/worker';

import {
  generateClean,
  generateDir,
  generateReport,
  mergeLink,
  mergeObject,
  selectLink,
  selectObject,
  setupHandlebars,
  setupOptions,
  setupSql
} from './pkg/helper';

import * as query from './pkg/query';

export function pkg() {
  const handlebarsSetup = new Worker({
    act(box, data, callback) {
      setupHandlebars(box, data, () => {
        this.pass(box, data, callback);
      });
    }
  });

  const optionsSetup = new Worker({
    act(box, data, callback) {
      setupOptions(box, data, () => {
        this.pass(box, data, callback);
      });
    }
  });

  const sqlSetup = new Worker({
    act(box, data, callback) {
      setupSql(box, data, () => {
        this.pass(box, data, callback);
      });
    }
  });

  const cleanGenerator = new Worker({
    decide(box) {
      return box.clean === true;
    },
    act(box, data, callback) {
      generateClean(() => {
        this.pass(box, data, callback);
      });
    }
  });

  const masterGenerator = new Worker({
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
      }, data.child ? 'child' : 'link');
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

  const reportGenerator = new Worker({
    act(box, data, callback) {
      generateReport(box, data, (error, report) => {
        this.log('cli', box, data, report.join('\n'));
        this.pass(box, data, callback);
      });
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

  const mysqlObjectSelector = new SqlBuilder({
    decide(box) {
      return box.host.indexOf('mysql') === 0;
    },
    host: 'mysql',
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

  const postgresqlObjectSelector = new SqlBuilder({
    decide(box) {
      return box.host.indexOf('postgres') === 0;
    },
    host: 'postgres',
    merge(box, data, { result }) {
      return mergeObject(result);
    }
  });

  const slicer = new Slicer({
    name: 'table'
  });

  const unifier = new Unifier({
    collect: true,
    name: 'table'
  });

  query.mysql(mysqlObjectSelector, selectObject);
  query.postgresql(postgresqlObjectSelector, selectObject);

  query.mysql(mysqlLinkSelector, selectLink);
  query.postgresql(postgresqlLinkSelector, selectLink);

  optionsSetup
    .connect(handlebarsSetup)
    .connect(sqlSetup)
    .connect(mysqlObjectSelector)
    .connect(postgresqlObjectSelector)
    .connect(cleanGenerator)
    .connect(masterGenerator)
    .connect(slicer)
    .connect(mysqlLinkSelector)
    .connect(postgresqlLinkSelector)
    .connect(objectGenerator)
    .connect(linkGenerator)
    .connect(unifier)
    .connect(reportGenerator);

  return [optionsSetup, reportGenerator];
}
