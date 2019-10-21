import { Worker } from '@scola/lib'

export function setupSql (bx, data, callback) {
  Worker.config.sql = {
    mysql: (box) => {
      return {
        dialect: 'mysql',
        host: box.host,
        dsn: box.host
      }
    },
    postgresql: (box) => {
      return {
        dialect: 'postgresql',
        host: box.host,
        dsn: box.host
      }
    }
  }

  callback()
}
