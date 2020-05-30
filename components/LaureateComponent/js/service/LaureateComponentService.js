function LaureateComponentService() { 
	//TODO: Intitialize service for LaureateComponent 
	this.db= [];
} 
// Add model to database table object 
LaureateComponentService.prototype.add = function (onePromotion) {
	this.db.push(onePromotion);
};
// Add laureate to a specific promotion by ID
LaureateComponentService.prototype.addLaureate = function (promotion_id, oneLaureate) {
	for(let promotion of this.db) {
		if(promotion.id === promotion_id) {
			promotion.content.push(oneLaureate);
		}
	}
	console.log(this.db);
};
// Remove from database object by index 
LaureateComponentService.prototype.remove = function(index, laureate_id = null) {
	this.db.splice(index, 1);
};
// Remove Laureate in a specific promotion by ID
LaureateComponentService.prototype.removeLaureate = function(promotion_id, laureate_id) {
	for(let promotion of this.db) {
		if(promotion.id === promotion_id) {
			for(let i = 0; i<promotion.content.length; i++) {
				if(promotion.content[i].id === laureate_id) promotion.content.splice(i,1);
			}
		}
	}
};
// get from database object by index 
LaureateComponentService.prototype.get = function(index) {
	return this.db[index];
};
// get Laureate in a specific promotion by ID
LaureateComponentService.prototype.getLaureate = function(promotion_id, laureate_id) {
	for(let promotion of this.db) {
		if(promotion.id === promotion_id) {
			for(let laureate of promotion.content) {
				if(laureate.id === laureate_id) return laureate;
			}
		}
	}
};
// elements count of database object 
LaureateComponentService.prototype.size = function() { 
	return this.db.length;
};
// Number of laureates in a specific promotion
LaureateComponentService.prototype.sizeLaureates = function(promotion_id) {
	for(let promotion of this.db) {
		if(promotion.id === promotion_id) {
			return promotion.content.length;
		}
	}
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
				dbSource[i].gender,
				dbSource[i].job,
				dbSource[i].city,
				dbSource[i].email,
				dbSource[i].stage,
				dbSource[i].current_enterprise,
				dbSource[i].experience,
				dbSource[i].photo,
				dbSource[i].rating,
				dbSource[i].linked_in,
				dbSource[i].special,
			)
		)
	}
	tmp.sort((a, b) => a.name.localeCompare(b.name));
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
			ret.push(new Promotion(promo.id, promo.name, promo.date, tmp));
		}
	}
	console.log(ret);
	return ret;
};

LaureateComponentService.prototype.isUpToDate = function(promotion_id) {
	for(let promotion of this.db) {
		if(promotion.id === promotion_id) {
			return true;
		}
	}
	return false;
};

LaureateComponentService.prototype.sort = function() {
	// SORT BY DATE
	this.db = this.db.sort((a, b) => b.date - a.date);
};

LaureateComponentService.prototype.sortLaureates = function(promotion_id) {
	for(let promotion of this.db) {
		if(promotion.id === promotion_id) {
			promotion.content.sort((a, b) => a.name.localeCompare(b.name));
		}
	}
};

/**
 * Extraction of all promotions :
 * @param dbPromotions
 */
LaureateComponentService.prototype.loadPromotion = function (dbPromotions) {
	for (let promotion of dbPromotions){
		this.add(
			new Promotion(promotion.id,promotion.name,new Date(transformDate(promotion.date)), this.load(promotion.content)
			)
		)
	}
	this.sort();
};
