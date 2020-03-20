const { Pool } = require("pg")

module.exports = new Pool({
  user: 'postgres',
  password: 'adminlum0s',
  host: 'localhost',
  port: 5432,
  database: 'my_teacher'
})