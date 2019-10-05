import {
  Slicer,
  SqlBuilder,
  Resolver,
  Worker
} from '@scola/lib'

import {
  generateClean,
  generateDir,
  generateReport,
  mergeLink,
  mergeObject,
  selectLink,
  selectObject,
  selectSchema,
  setupHandlebars,
  setupOptions,
  setupSql
} from './pkg/helper'

import * as query from './pkg/query'

export function pkg () {
  const handlebarsSetup = new Worker({
    act (box, data) {
      setupHandlebars(box, data, () => {
        this.pass(box, data)
      })
    }
  })

  const optionsSetup = new Worker({
    act (box, data) {
      setupOptions(box, data, () => {
        this.pass(box, data)
      })
    }
  })

  const sqlSetup = new Worker({
    act (box, data) {
      setupSql(box, data, () => {
        this.pass(box, data)
      })
    }
  })

  const cleanGenerator = new Worker({
    decide (box) {
      return box.clean === true
    },
    act (box, data) {
      generateClean(box, () => {
        this.pass(box, data)
      })
    }
  })

  const linkGenerator = new Worker({
    decide (box, data) {
      return data.link !== undefined
    },
    act (box, data) {
      generateDir(box, data, () => {
        this.pass(box, data)
      }, `link/${data.sides}`, data.link)
    }
  })

  const masterGenerator = new Worker({
    decide (box, data) {
      return data.length > 0
    },
    act (box, data) {
      generateDir(box, { data }, () => {
        this.pass(box, data)
      }, 'master')
    }
  })

  const objectGenerator = new Worker({
    decide (box, data) {
      return data.link === undefined
    },
    act (box, data) {
      generateDir(box, data, () => {
        this.pass(box, data)
      }, 'object', data.object)
    }
  })

  const reportGenerator = new Worker({
    act (box, data) {
      generateReport(box, data, (e, report) => {
        console.log(report.join('\n'))
        this.pass(box, data)
      })
    },
    decide (box, data) {
      return Array.isArray(data)
    }
  })

  const mysqlLinkSelector = new SqlBuilder({
    decide (box, data) {
      return (
        box.host.indexOf('mysql') === 0 &&
        data.link !== undefined
      )
    },
    host: 'mysql',
    merge (box, data, { result }) {
      return mergeLink(box, data, result)
    }
  })

  const mysqlObjectSelector = new SqlBuilder({
    decide (box) {
      return box.host.indexOf('mysql') === 0
    },
    host: 'mysql',
    merge (box, data, { result }) {
      return mergeObject(box, result)
    }
  })

  const postgresqlLinkSelector = new SqlBuilder({
    decide (box, data) {
      return (
        box.host.indexOf('postgresql') === 0 &&
        data.link !== undefined
      )
    },
    host: 'postgresql',
    merge (box, data, { result }) {
      return mergeLink(box, data, result)
    }
  })

  const postgresqlObjectSelector = new SqlBuilder({
    decide (box) {
      return box.host.indexOf('postgresql') === 0
    },
    host: 'postgresql',
    merge (box, data, { result }) {
      return mergeObject(box, result)
    }
  })

  const slicer = new Slicer({
    name: 'table'
  })

  const resolver = new Resolver({
    collect: true,
    name: 'table'
  })

  query.mysql(mysqlObjectSelector, selectSchema, selectObject)
  query.postgresql(postgresqlObjectSelector, selectSchema, selectObject)

  query.mysql(mysqlLinkSelector, selectSchema, selectLink)
  query.postgresql(postgresqlLinkSelector, selectSchema, selectLink)

  optionsSetup
    .connect(handlebarsSetup)
    .connect(sqlSetup)
    .connect(mysqlObjectSelector)
    .connect(postgresqlObjectSelector)
    .connect(cleanGenerator)
    .connect(masterGenerator)
    .connect(slicer
      .bypass(resolver))
    .connect(mysqlLinkSelector)
    .connect(postgresqlLinkSelector)
    .connect(objectGenerator)
    .connect(linkGenerator)
    .connect(resolver)
    .connect(reportGenerator)

  return [optionsSetup, reportGenerator]
}
