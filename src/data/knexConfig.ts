import { Config } from 'knex';

export const development: Config = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './src/data/hubs.db',
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run('PRAGMA foreign_keys = ON', done);
    },
  },
  migrations: {
    directory: './src/data/migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: './src/data/seeds',
  },
};
