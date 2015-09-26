var db = require('./pgProvider');
var Promise = require("bluebird");
var User = require('../models/User.js')

function deserialize(response) {
	var user = response[0];
	return Promise.resolve(user == null ? null : User(user))
}

function deserializeAll(users) {
	if(users == null) return Promise.resolve(null)
	if(Array.isArray(users)) return Promise.resolve(users.map(User))
}

function findUserByEmail(email) {
	return db('users')
		.where('email', email)
		.then(deserialize);
}

function findUserById(userId) {
	return db('users')
		.where('user_id', userId)
		.then(deserialize);
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
	findUserById: findUserById,
	findUserByEmail: findUserByEmail,
	createUser: function(user) {
		return findUserByEmail(user.email)
			.then(function(existingUser) {
				if(existingUser != null)
					return Promise.reject('User email already exists');

				return db.returning('*')
					.insert(user.toDbModel())
					.into('users')
					.then(deserialize)
		});
	}
}