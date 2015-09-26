'use strict';
var uuid = require('node-uuid');
var bcrypt = require('bcryptjs');

// private variables
var hash = Symbol();

class User {
	constructor(data) {
	    this.userId = data.userId || data.user_id || uuid.v4();
	    this.firstname = data.firstname;
	    this.lastname = data.lastname;
	    this.email = data.email;
	    this.userType = data.userType || data.user_type;
	    this[hash] = data.hash || (data.password == null ? undefined : bcrypt.hashSync(data.password, 10));
	}

	get name() { return this.firstname + ' ' + this.lastname }

	passwordIsValid(password) {
		return bcrypt.compareSync(password, this[hash])
	}

	toUIModel() {
		return {
			userId: this.userId,
			email: this.email,
			firstname: this.firstname,
			lastname: this.lastname,
			userType: this.userType
		}
	}

	toDBModel() {
		return  {
			user_id: this.userId,
			email: this.email,
			firstname: this.firstname,
			lastname: this.lastname,
			user_type: this.userType,
			hash: this[hash]
		}
	}

	// ensures we never overwrite hash
	toUpdateSafeDBModel() {
		return  {
			email: this.email,
			firstname: this.firstname,
			lastname: this.lastname,
			user_type: this.userType
		}
	}

}

module.exports = (userData) => new User(userData);
