var pg = require('pg');

var conString = "postgres://postgres:"+process.env.PSQL_PASS+"@localhost/bbdb";

var connect = function(response, sql, params, callback) {
	pg.connect(conString, function(err, client, done) {
		client.query(sql, params, function(err, result) {
			if(err) {
				console.log(err)
				response.writeHead(500, {'content-type': 'text/plain'});
				response.end('A databse error occurred');
			} else if(callback)
				callback(response, result);
			else if(params && result.rows.length == 1)
				response.json(result.rows[0]);
			else
				response.json(result.rows);
			done();
		});
	});	
}

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
	getUser: function(response, email) {
		var sql = 'SELECT * FROM users WHERE email = $1';
		connect(response, sql, [email]) 
	},
	createUser: function(response, user) {
		var params = [
			user.email,
			user.name,
			user.stuff
		];
		var sql = 'INSERT INTO users (email,name,stuff) ' + 
			'VALUE ($1,$2,$3) RETURNING *';

		connect(response, sql, params);
	}
}

