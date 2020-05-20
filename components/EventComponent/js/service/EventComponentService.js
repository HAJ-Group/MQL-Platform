function EventComponentService() { 
	//TODO: Intitialize service for EventComponent 
	this.db = []; 
} 
// Add model to database table object 
EventComponentService.prototype.add = function (oneEvent) { 
	this.db.push(oneEvent); 
}; 
// Remove from database object by index 
EventComponentService.prototype.remove = function(index) { 
	this.db.splice(index, 1); 
}; 
// get from database object by index 
EventComponentService.prototype.get = function(index) { 
	return this.db[index]; 
}; 
// elements count of database object 
EventComponentService.prototype.size = function() { 
	return this.db.length; 
}; 
// Load all data from source to database object 
EventComponentService.prototype.load = function(dbSource) { 
	for (let i = 0; i < dbSource.length; i++) {
		// Transforming database source into database object of Event model 
		this.add(
			new Event(
				dbSource[i].id,
			)
		)
	} 
}; 
