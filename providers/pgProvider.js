module.exports = require('knex')({
  client: 'pg',
  connection: "postgres://postgres:bidbuilders@localhost/bbdb"
});

