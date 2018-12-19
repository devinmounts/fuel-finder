const monk = require('monk');
const db = monk(process.env.DATABASE_URL)

module.exports = {
  env: 'development',
  db: db,
  port: process.env.PORT || 5000
}  
