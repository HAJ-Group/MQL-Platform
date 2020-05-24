function LaureateComponentService() { 
	//TODO: Intitialize service for LaureateComponent 
	this.dbP= [];
} 
// Add model to database table object 
LaureateComponentService.prototype.add = function (oneLaureate) { 
	this.dbP.push(oneLaureate);
}; 
// Remove from database object by index 
LaureateComponentService.prototype.remove = function(index) { 
	this.dbP.splice(index, 1);
}; 
// get from database object by index 
LaureateComponentService.prototype.get = function(index) { 
	return this.dbP[index];
}; 
// elements count of database object 
LaureateComponentService.prototype.size = function() { 
	return this.dbP.length;
}; 
// Load all data from source to database object 
LaureateComponentService.prototype.load = function(dbSource) {
	let tmp=[];
	for (let i = 0; i < dbSource.length; i++) {
		// Transforming database source into database object of Laureate model
		tmp.push(
			new Laureate( 
				dbSource[i].id, 
				dbSource[i].name,
				dbSource[i].age,
				dbSource[i].address,
				dbSource[i].ville,
				dbSource[i].email,
				dbSource[i].stage,
				dbSource[i].job,
				dbSource[i].current_enterprise,
				dbSource[i].experience,
				dbSource[i].photo,
				dbSource[i].rating,
				dbSource[i].linked_in,
			)
		)
	}
	return tmp;
};
/**
 * Extraction of all promotions :
 * @param dbPromotions
 */
LaureateComponentService.prototype.loadPromotion = function (dbPromotions) {
	for (let promotion of dbPromotions){
		this.add(
			new Promotion(promotion.id,promotion.name, this.load(promotion.content)
			)
		)
	}
};
