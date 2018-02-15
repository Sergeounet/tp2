/**
 *
 * @param db
 * @constructor
 */
var UserRepository = function (db) {
	this.db = db;
};

/**
 *
 * @param {User} user
 */
UserRepository.prototype.create = function (user) {
	if (!user) {
		throw 'User object is undefined';
	}

	if (!user.id || !user.firstname || !user.lastname || !user.birthday) {
		throw 'User object is missing information';
	}

	var userData = {
		id: user.id,
		firstname: user.firstname,
		lastname: user.lastname,
		birthday: user.birthday
	};

	this.db
		.get('users')
		.push(userData)
		.write()
};

/**
 *
 * @param {number} id
 * @return User
 */
UserRepository.prototype.findOneById = function (id) {
	if(!id)
		throw "Missing user ID";

	var user = this.db.get('users').find({id: id}).value();
	if(user == null)
		throw "Requested user doesn't exist";
	
	return user;
};

/**
 *
 * @param {User} user
 */
UserRepository.prototype.update = function (user) {
	if(!user)
		throw "User object is undefined";
	
	if(!user.id)
		throw "Missing user ID";

	var updatedUser = this.db.get('users').find({id: user.id}).assign(user).write();
	if(updatedUser == null) 
		throw "Requested user doesn't exist";
	
	return updatedUser;
};

/**
 *
 * @param {number} id
 */
UserRepository.prototype.delete = function (id) {
	if(!id)
		throw "Missing user ID";

	var user = this.db.get('users').remove({id: id}).write();
	return user;
};


module.exports = UserRepository;


