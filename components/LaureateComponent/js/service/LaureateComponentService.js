function LaureateComponentService() { 
	//TODO: Intitialize service for LaureateComponent 
	this.db = []; 
} 
// Add model to database table object 
LaureateComponentService.prototype.add = function (oneLaureate) { 
	this.db.push(oneLaureate); 
}; 
// Remove from database object by index 
LaureateComponentService.prototype.remove = function(index) { 
	this.db.splice(index, 1); 
}; 
// get from database object by index 
LaureateComponentService.prototype.get = function(index) { 
	return this.db[index]; 
}; 
// elements count of database object 
LaureateComponentService.prototype.size = function() { 
	return this.db.length; 
}; 
// Load all data from source to database object 
LaureateComponentService.prototype.load = function(dbSource) { 
	for (let i = 0; i < dbSource.length; i++) { 
		// Transforming database source into database object of Laureate model 
		this.add( 
			new Laureate( 
				dbSource[i].id, 
			) 
		) 
	} 
}; 
