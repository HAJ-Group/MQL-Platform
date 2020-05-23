function PartnerComponentService() { 
	//TODO: Intitialize service for PartnerComponent 
	this.db = []; 
} 
// Add model to database table object 
PartnerComponentService.prototype.add = function (onePartner) { 
	this.db.push(onePartner); 
}; 
// Remove from database object by index 
PartnerComponentService.prototype.remove = function(index) { 
	this.db.splice(index, 1); 
}; 
// get from database object by index 
PartnerComponentService.prototype.get = function(index) { 
	return this.db[index]; 
}; 
// elements count of database object 
PartnerComponentService.prototype.size = function() { 
	return this.db.length; 
}; 
// Load all data from source to database object 
PartnerComponentService.prototype.load = function(dbSource) { 
	for (let i = 0; i < dbSource.length; i++) { 
		// Transforming database source into database object of Partner model 
		this.add( 
			new Partner( 
				dbSource[i].id,
				dbSource[i].bg,
				dbSource[i].name,
				dbSource[i].ca,
				dbSource[i].description,
				dbSource[i].nbr_colla,
				dbSource[i].website,
				dbSource[i].image,
			)
		) 
	} 
}; 
