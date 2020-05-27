function AreaComponentService() { 
	//TODO: Intitialize service for AreaComponent 
	this.db = []; 
} 
// Add model to database table object 
AreaComponentService.prototype.add = function (oneArea) { 
	this.db.push(oneArea); 
}; 
// Remove from database object by index 
AreaComponentService.prototype.remove = function(index) { 
	this.db.splice(index, 1); 
}; 
// get from database object by index 
AreaComponentService.prototype.get = function(index) { 
	return this.db[index]; 
}; 
// elements count of database object 
AreaComponentService.prototype.size = function() { 
	return this.db.length; 
};

AreaComponentService.prototype.isExist = function(username, password) {
	for(let user of this.db) {
		if(user.username === username && user.password === password) return true;
	}
	return false;
};
// Load all data from source to database object 
AreaComponentService.prototype.load = function(dbSource) { 
	for (let i = 0; i < dbSource.length; i++) { 
		// Transforming database source into database object of Area model 
		this.add( 
			new Area( 
				dbSource[i].id,
				dbSource[i].username,
				dbSource[i].password
			) 
		) 
	} 
}; 
