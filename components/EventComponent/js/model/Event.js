/* Default Model for EventComponent */ 
function EventModel(id,title,date,description='', content=[]) {
	this.id = id;
	this.title=title;
	this.date=date;
	this.description=description;
	this.content=content;
}
/*  Card Event Model */
function CardEvent(title, description='', image='', type='card') {
	this.title = title;
	this.description = description;
	this.image = image;
	this.type = type;
}


/* gallery Event Model */
function GalleryEvent(title='', description='', images, type='image-show') {
	this.title=title;
	this.description = description;
	this.images = images;
	this.type = type;
}




