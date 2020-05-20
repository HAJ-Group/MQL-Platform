function ActivityComponentService() { 
	//TODO: Intitialize service for ActivityComponent 
	this.db = []; 
} 
// Add model to database table object 
ActivityComponentService.prototype.add = function (oneActivity) { 
	this.db.push(
		new Activity(
			oneActivity.id,
			oneActivity.description,
			oneActivity.modules,
			oneActivity.activity
		)
	);
}; 
// Remove from database object by index 
ActivityComponentService.prototype.remove = function(index) { 
	this.db.splice(index, 1); 
}; 
// get from database object by index 
ActivityComponentService.prototype.get = function(index) { 
	return this.db[index]; 
}; 
// elements count of database object 
ActivityComponentService.prototype.size = function() { 
	return this.db.length; 
}; 
// Load all data from source to database object 
ActivityComponentService.prototype.load = function(dbSource) { 
	for (let i = 0; i < dbSource.length; i++) { 
		// Transforming database source into database object of Activity model 
		this.add(
			new Activity(
			dbSource[i].id,
			dbSource[i].description,
			dbSource[i].modules,
			dbSource[i].activity
			)
		) 
	} 
}; 
