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

// Loading card type content
EventComponentService.prototype.loadCard = function(content) {
	return new CardEvent(content.title, content.description, content.image, content.type);
};

// Loading gallery type content
EventComponentService.prototype.loadGallery = function(content) {
	return new GalleryEvent(content.title, content.description, content.images, content.type);
};

/**
 * Defining search action methode
 * @param title_key
 * @returns {[]}
 */
EventComponentService.prototype.searchByKey = function(title_key) {
	let ret = [];
	for(let event of this.db) {
		if(event.title.toLowerCase().includes(title_key.toLowerCase())) {
			ret.push(event);
		}
	}
	return ret;
};

EventComponentService.prototype.sort = function() {
	// SORT BY DATE
	this.db = this.db.sort((a, b) => b.date - a.date);
};

// Load all data from source to database object 
EventComponentService.prototype.load = function(dbSource) {
	for (let i = 0; i < dbSource.length; i++) {
		// Transforming database source into database object of Event model
		let container = [];
		for(let content of dbSource[i].content) {
			if(content.type === 'card') container.push(this.loadCard(content));
			if(content.type.startsWith('image-')) container.push(this.loadGallery(content));
		}
		this.add(
			new EventModel(dbSource[i].id,
				dbSource[i].title,
				new Date(transformDate(dbSource[i].date)),
				dbSource[i].description,
				container,
			)
		);
	}
};
