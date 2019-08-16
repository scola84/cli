import { SqlBuilder } from '@scola/doc';

export function setupSql(bx, data, callback) {
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

  callback();
}
