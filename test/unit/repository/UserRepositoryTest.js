var UserRepository = require('../../../src/repository/UserRepository');


describe("UserRepository", function() {
	it("should call db.write", function(){
		var mockDb = jasmine.createSpyObj('db', ['get', 'push', 'write']);
		mockDb.get.and.returnValue(mockDb);
		mockDb.push.and.returnValue(mockDb);

		var repository = new UserRepository(mockDb);
		repository.create({
			id : 1,
			firstname: 'John',
			lastname : 'Doe',
			birthday : '2000-01-01'
		});

		expect(mockDb.push).toHaveBeenCalledWith({
			id : 1,
			firstname: 'John',
			lastname : 'Doe',
			birthday : '2000-01-01'
		});
		expect(mockDb.write).toHaveBeenCalledTimes(1);
	});

	it("should throw exception undefined", function(){
		var repository = new UserRepository({});
		var f = function(){
			repository.create();
		};

		expect(f).toThrow('User object is undefined')
	});

	it("should throw exception missing information", function(){
		var repository = new UserRepository({});
		var f = function(){
			repository.create({
				'id' : 1
			});
		};

		expect(f).toThrow('User object is missing information')
	});
});

// Get user by ID
describe("UserRepository", function() {
	it("should return a user object", function(){

		var mockDb = jasmine.createSpyObj('db', ['get', 'push', 'write', 'find', 'value']);
		mockDb.get.and.returnValue(mockDb);
		mockDb.push.and.returnValue(mockDb);
		mockDb.find.and.returnValue(mockDb);
		mockDb.value.and.returnValue({
			id : 1,
			firstname: 'John',
			lastname : 'Doe',
			birthday : '2000-01-01'
		});

		var repository = new UserRepository(mockDb);
		var user = repository.findOneById(1);

		expect(user).toEqual({
			id : 1,
			firstname: 'John',
			lastname : 'Doe',
			birthday : '2000-01-01'
		})

		expect(mockDb.find).toHaveBeenCalledWith({id: 1});
	});

	it("should throw exception 'Requested user doesn't exist'", function(){
		var mockDb = jasmine.createSpyObj('db', ['get', 'push', 'write', 'find', 'value']);
		mockDb.get.and.returnValue(mockDb);
		mockDb.push.and.returnValue(mockDb);
		mockDb.find.and.returnValue(mockDb);
		mockDb.value.and.returnValue(null);
		var repository = new UserRepository(mockDb);
		var f = function(){
			repository.findOneById(1);
		};

		expect(f).toThrow('Requested user doesn\'t exist')
	});

	it("should throw exception 'Missing user ID'", function(){
		var mockDb = jasmine.createSpyObj('db', ['get', 'push', 'write', 'find', 'value']);
		mockDb.get.and.returnValue(mockDb);
		mockDb.push.and.returnValue(mockDb);
		mockDb.find.and.returnValue(mockDb);
		mockDb.value.and.returnValue(mockDb);
		var repository = new UserRepository(mockDb);
		var f = function(){
			repository.findOneById();
		};

		expect(f).toThrow('Missing user ID')
	});
});

// Update user
describe("UserRepository", function() {
	it("should return an updated user object", function(){

		var mockDb = jasmine.createSpyObj('db', ['get', 'push', 'write', 'find', 'assign']);
		mockDb.get.and.returnValue(mockDb);
		mockDb.push.and.returnValue(mockDb);
		mockDb.find.and.returnValue(mockDb);
		mockDb.assign.and.returnValue(mockDb);
		mockDb.write.and.returnValue({
			id : 1,
			firstname: 'Jesus',
			lastname : 'Doe',
			birthday : '2000-01-01'
		});

		var repository = new UserRepository(mockDb);
		var user = repository.update({id: 1, firstname: 'Jesus'});

		expect(user).toEqual({
			id : 1,
			firstname: 'Jesus',
			lastname : 'Doe',
			birthday : '2000-01-01'
		})

		expect(mockDb.find).toHaveBeenCalledWith({id: 1});
		expect(mockDb.assign).toHaveBeenCalledWith({id: 1, firstname: 'Jesus'});
	});

	it("should throw exception 'User object is undefined'", function(){
		var mockDb = jasmine.createSpyObj('db', ['get', 'push', 'write', 'find', 'value']);
		mockDb.get.and.returnValue(mockDb);
		mockDb.push.and.returnValue(mockDb);
		mockDb.find.and.returnValue(mockDb);
		mockDb.value.and.returnValue(null);
		var repository = new UserRepository(mockDb);
		var f = function(){
			repository.update();
		};

		expect(f).toThrow('User object is undefined')
	});

	it("should throw exception 'Missing user ID'", function(){
		var mockDb = jasmine.createSpyObj('db', ['get', 'push', 'write', 'find', 'value']);
		mockDb.get.and.returnValue(mockDb);
		mockDb.push.and.returnValue(mockDb);
		mockDb.find.and.returnValue(mockDb);
		mockDb.value.and.returnValue(mockDb);
		var repository = new UserRepository(mockDb);
		var f = function(){
			repository.update(15);
		};

		expect(f).toThrow('Missing user ID')
	});

	it("should throw exception 'Requested user doesn't exist'", function(){
		var mockDb = jasmine.createSpyObj('db', ['get', 'push', 'write', 'find', 'assign']);
		mockDb.get.and.returnValue(mockDb);
		mockDb.push.and.returnValue(mockDb);
		mockDb.find.and.returnValue(mockDb);
		mockDb.assign.and.returnValue(mockDb);
		mockDb.write.and.returnValue(null);
		var repository = new UserRepository(mockDb);
		var f = function(){
			repository.update({id: 1, firstname: 'Jesus'});
		};

		expect(f).toThrow('Requested user doesn\'t exist')
	});
});

// Delete user
describe("UserRepository", function() {
	it("should return a user object", function(){

		var mockDb = jasmine.createSpyObj('db', ['get', 'push', 'write', 'find', 'remove']);
		mockDb.get.and.returnValue(mockDb);
		mockDb.push.and.returnValue(mockDb);
		mockDb.remove.and.returnValue(mockDb);
		mockDb.write.and.returnValue({
			id : 1,
			firstname: 'John',
			lastname : 'Doe',
			birthday : '2000-01-01'
		});

		var repository = new UserRepository(mockDb);
		var user = repository.delete(1);

		expect(user).toEqual({
			id : 1,
			firstname: 'John',
			lastname : 'Doe',
			birthday : '2000-01-01'
		})

		expect(mockDb.remove).toHaveBeenCalledWith({id: 1});
	});

	it("should throw exception 'Missing user ID'", function(){
		var mockDb = jasmine.createSpyObj('db', ['get', 'push', 'write', 'find', 'value']);
		mockDb.get.and.returnValue(mockDb);
		mockDb.push.and.returnValue(mockDb);
		mockDb.find.and.returnValue(mockDb);
		mockDb.value.and.returnValue(mockDb);
		var repository = new UserRepository(mockDb);
		var f = function(){
			repository.delete();
		};

		expect(f).toThrow('Missing user ID')
	});
});
