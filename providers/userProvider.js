var db = require('./pgProvider');
var Promise = require("bluebird");
var User = require('../models/User.js')

function deserialize(response) {
	var user = response[0];
	if(user == null) return Promise.resolve(null)
	else return Promise.resolve(User(users))
}

function deserializeAll(users) {
	if(users == null) return Promise.resolve(null)
	if(Array.isArray(users)) return Promise.resolve(users.map(User))
}

function findUserByEmail(email) {
	return db('users').where('email', email).then(deserialize);
}

function findUserByUserId(userId) {
	return db('users').where('user_id', userId).then(deserialize);
}

module.exports = {
	authenticate: function(email, password) {
		return findUserByEmail.then(function(user) {
			if(user == null) 
				return Promise.reject('Invalid Username')
			else if(user.passwordIsValid(password))
				return Promise.resolve(user)
			else
				return Promise.reject('Invalid Password')
		});
	},
	createUser: function(user) {
		findUserByEmail(user.email).then(function(existingUser) {
			if(existingUser != null)
				return Promise.reject('User email already exists');

			console.log(db('users').insert(user.toDbModel()))
		});
	}
}