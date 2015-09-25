var conString = "postgres://postgres:"+process.env.PSQL_PASS+"@localhost/bbdb";

var db = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING
});

// var getTeam = function(response, person_id) {
// 	var column = isNaN(person_id) ? 'name' : 'person_id';
// 	var sql = 'WITH RECURSIVE sub_team AS ( '+
// 		'SELECT person_id,name,manager,0 AS depth ' +
// 		'FROM team WHERE '+column+' = $1 ' +
// 		'UNION ' +
// 		'SELECT t.person_id,t.name,t.manager,s.depth+1 ' +
// 		'FROM team t JOIN sub_team s ON t.manager = s.person_id ' +
// 		') SELECT * FROM sub_team; ';
	
// 	connect(response, sql, [person_id]);
// }

module.exports = {
	getUser: function(email) {
		return db('users').where('email', 1)
	},
	createUser: function(response, user) {
		db('users').insert(user)
	}
}

