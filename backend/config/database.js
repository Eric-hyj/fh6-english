module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('PGHOST', env('DATABASE_HOST', '127.0.0.1')),
      port: env.int('PGPORT', env.int('DATABASE_PORT', 5432)),
      database: env('PGDATABASE', env('DATABASE_NAME', 'fh6')),
      user: env('PGUSER', env('DATABASE_USERNAME', '')),
      password: env('PGPASSWORD', env('DATABASE_PASSWORD', '')),
      ssl: env.bool('DATABASE_SSL', false),
    },
    pool: { min: 0, max: 10 },
    acquireConnectionTimeout: 60000,
  },
})
