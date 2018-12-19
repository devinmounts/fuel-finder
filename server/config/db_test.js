const monk = require('monk');
const db_test = monk(process.env.TEST_DATABASE_URL)

module.exports = {
  env: 'test',
  db: db_test,
  port: process.env.PORT || 5100
}  