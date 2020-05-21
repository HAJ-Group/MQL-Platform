/*Global Variables*/ 
let view; 
let service;
let current_page_number = 1;
const MAX_NEWS_PER_PAGE = 5;
/*Default class*/ 
function EventComponent(service) { 
	//TODO: Intitialize controller for EventComponent 
	current_component = 'Event'; 
	loadResources(); 
	this.service = service; 
	//this.table = this.get('table-EventID'); Uncomment for apply dynamic data loading to a declared html tag by id (Add other tables if needed with associated methods)
	this.page_blocks = split(this.service.db, MAX_NEWS_PER_PAGE);
	this.block_nav = this.get('navigation');
	this.block_main = this.get('main');
	this.block_switch = this.get('switcher');
	this.htmlSaver = {
		nav: this.block_nav.innerHTML,
		main: this.block_main.innerHTML,
		switcher: this.block_switch.innerHTML,
	};
} 
EventComponent.prototype.get = function (id) { 
	return document.getElementById(id); 
}; 
// Adding a row in the table member 
EventComponent.prototype.addEventRow = function (oneEvent) { 
	let row = this.table.insertRow(); 
	//row.insertCell().innerHTML = news.id; 
	//TODO:INSERT DATA IN CELLS 
}; 
// Printing all service data into the table member 
EventComponent.prototype.printEventList = function () { 
	for (let i = 0; i < this.service.size(); i++) { 
		this.addEventRow(this.service.get(i)); 
	} 
};

/**
 * Create navigation menu dynamically
 */
EventComponent.prototype.fillNavigation = function () {
	let htmlContent = this.htmlSaver.nav;
	for(let event of this.page_blocks[current_page_number - 1]) {
		htmlContent += '<hr>\n' +
			'<div><a class="menuitem" href="#' + event.id + '">' + event.title + '</a></div>\n';
	}
	this.block_nav.innerHTML = htmlContent;
};

/**
 * Filling main block
 */
EventComponent.prototype.fillMain = function() {
	let htmlContent = this.htmlSaver.main;
	let shows = [];
	let shows_counter = 0;
	for(let event of this.page_blocks[current_page_number - 1]) {
		htmlContent += '<div id="' + event.id + '" >' +
			'<div class="title">\n' + event.title + '</div>\n' +
			'<div class="details">' +
			'<div id="gallery" class="gallery-view' + event.id + '"></div>' +
			'<p>' + event.description + '</p>\n';
		// Contents
		if(event.content !== []) {
			htmlContent += '<div class="sub-title">';
			for(let content of event.content) {
				if(content.type === 'card') {
					htmlContent += '<div class="card-event">\n' +
						'<img src="../../resources/pictures/' + content.image + '" alt="">\n' +
						'<div class="description">\n' +
						'<div class="element">' + content.title + '</div>\n' +
						'<p>' + content.description + '</p>' +
						'</div>\n' +
						'</div>';
				}
				if(content.type === 'image-show') {
					htmlContent += '<div class="card-event">\n' +
						'<div class="full-width">\n' +
						'<div class="element">' + content.title + '</div>\n' +
						'<div id="book' + shows_counter + '" class="book-images"></div>\n' +
						'</div>\n' +
						'</div>';
						shows.push({
							book_name: 'book' + shows_counter++,
							book_pics: content.images,
						});
				}
				if(content.type === 'image-grid') {
					htmlContent += '<p>' + content.description + '</p>' +
						'<div class="row"><span class="column">';
					for(let image of content.images) {
						htmlContent += '<img onclick="popIMG(this.id)" id="id_' + image + '" src="' + image + '" alt="MQL PLATFORM">\n';
					}
					htmlContent += '</span></div>';
				}
			}
			htmlContent += '</div>';
		}
		htmlContent += '</span></div>\n</div>\n' +	'</div>';
	}
	this.block_main.innerHTML = htmlContent;
	for(let show of shows) {
		createBook(show.book_pics, show.book_name);
	}
};

/**
 * Create page switcher dynamically
 */
EventComponent.prototype.fillSwitcher = function () {
	let htmlContent = this.htmlSaver.switcher;
	let pages = this.page_blocks.length;
	for(let i = 1; i<=pages; i++) {
		if(current_page_number === i) htmlContent += '<span onclick="view.navigate(' + i + ', true)" class="active-page">' + i + '</span>';
		else htmlContent += '<span onclick="view.navigate(' + i + ', true)">' + i + '</span>';
	}
	this.block_switch.innerHTML = htmlContent;
};
/**
 * Navigate between pages
 * @param page_number
 * @param top
 */
EventComponent.prototype.navigate = function(page_number, top=false) {
	current_page_number = page_number;
	this.fillNavigation();
	this.fillMain();
	this.fillSwitcher();
	addTitleIcon('../../resources/pictures/Event-logo.png');
	detect_subContent_trigger_left_bar();
	if(top) window.location.href = '#header';
};
/* Main Function */ 
function main() { 
	service = new EventComponentService(); 
	service.load(dbEvent);
	view = new EventComponent(service); 
	//view.printEventList(); Uncomment to print data in table member
	//view.printEventList(); Uncomment to print data in table member
	view.fillNavigation();
	view.fillMain();
	view.fillSwitcher();
	// Stays last
	addTitleIcon('../../resources/pictures/Event-logo.png');
	detect_subContent_trigger_left_bar();
}
