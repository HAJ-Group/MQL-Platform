function LaureateComponentService() { 
	//TODO: Intitialize service for LaureateComponent 
	this.db= [];
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
	let tmp=[];
	for (let i = 0; i < dbSource.length; i++) {
		// Transforming database source into database object of Laureate model
		tmp.push(
			new Laureate( 
				dbSource[i].id, 
				dbSource[i].name,
				dbSource[i].job,
				dbSource[i].city,
				dbSource[i].email,
				dbSource[i].stage,
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
 * Defining search action methode
 * @param title_key
 * @returns {[]}
 */
LaureateComponentService.prototype.searchByKey = function(title_key) {
	let ret = [];
	let addPromo;
	for(let promo of this.db) {
		let tmp = [];
		addPromo = false;
		// Filter Laureates names
		for(let laureate of promo.content) {
			if(laureate.name.toLowerCase().includes(title_key.toLowerCase())) {
				tmp.push(laureate);
				addPromo = true;
			}
		}
		if(addPromo) {
			promo.content = tmp;
			ret.push(promo);
		}
	}
	console.log(ret);
	return ret;
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
