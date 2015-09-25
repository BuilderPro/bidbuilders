module.exports = require('knex')({
  client: 'pg',
  connection: "postgres://"+ process.env.PSQL_ROLE +":"+ process.env.PSQL_PASS +"@localhost/bbdb"
});

