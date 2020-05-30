/*Global Variables*/ 
let view; 
let service;
let current_page_number = 1;
const MAX_EVENT_PER_PAGE = 5;
/*Default class*/ 
function EventComponent(service) { 
	//TODO: Intitialize controller for EventComponent 
	current_component = 'Event'; 
	loadResources(); 
	this.service = service; 
	//this.table = this.get('table-EventID'); Uncomment for apply dynamic data loading to a declared html tag by id (Add other tables if needed with associated methods)
	this.page_blocks = split(this.service.db, MAX_EVENT_PER_PAGE);
	this.block_nav = $('#navigation');
	this.block_main = $('#main');
	this.block_switch = $('#switcher');
	this.htmlSaver = {
		nav: this.block_nav.innerHTML,
		main: this.block_main.innerHTML,
		switcher: this.block_switch.innerHTML,
	};
} 

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
			'<p class="date">' + formattedDate(event.date) + '</p>' +
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
EventComponent.prototype.navigate = function(page_number=1, top=false) {
	current_page_number = page_number;
	this.fillNavigation();
	this.fillMain();
	this.fillSwitcher();
	addTitleIcon('../../resources/pictures/Event-logo.png', true);
	detect_subContent_trigger_left_bar();
	if(top) window.location.href = '#header';
};

/**
 * Filtering function works with search box
 */
EventComponent.prototype.filterKey = function () {
	let key = $('#key').value;
	if(key === '') {
		// LOAD ALL DATA
		this.page_blocks = split(this.service.db, MAX_EVENT_PER_PAGE);
	} else {
		// LOAD BY KEY
		this.page_blocks = split(this.service.searchByKey(key), MAX_EVENT_PER_PAGE);
		console.log(this.service.searchByKey(key));
	}
	if(this.page_blocks.length === 0) {
		$('.error-message')[0].innerHTML = 'Event not Found !';
		$('#key').setAttribute('class', 'search-error');
		showEmptyErrorResult();
	}
	else {
		$('.error-message')[0].innerHTML = '';
		$('#key').setAttribute('class', 'search-input');
	}
	this.navigate();
};

/* FORM SERVICES */
EventComponent.prototype.addData = function() {
	$('#eventSubmit').setAttribute('onclick', 'view.submitData()');
	popFORM();
};

EventComponent.prototype.editData = function(index) {
	let el_title = $('#eventTitle');
	let el_desc = $('#eventDescription');
	//....
	let target = this.service.get(index);
	el_title.value = target.title;
	el_desc.value = target.description;
	//...
	$('#eventSubmit').setAttribute('onclick', 'view.submitData(\'edit\', ' + index + ')');
	popFORM();
};

EventComponent.prototype.deleteData = function(index) {
	if(confirm('Are you sure you want to delete this Event ?')) {
		this.service.remove(index);
		//....
		this.page_blocks = split(this.service.db, MAX_EVENT_PER_PAGE);
		this.navigate();
	}
};

EventComponent.prototype.submitData = function (action = 'add', index = '0') {
	// GETTING DATA MEMBERS
	let title = $('#eventTitle').value;
	let desc = $('#eventDescription').value;
	//...
	if(action === 'add') {
		this.service.add(new EventModel(this.service.size() + 1, title, new Date(), desc));
	}
	if(action === 'edit') {
		let target = this.service.get(index);
		target.title = title;
		target.description = desc;
		//target.date = new Date();
		//...
		$('#eventSubmit').setAttribute('onclick', 'view.submitData()');
	}
	this.page_blocks = split(this.service.db, MAX_EVENT_PER_PAGE);
	closeFORM();
	this.navigate();
};
EventComponent.prototype.triggerSubmit = function () {
	let submit_element = $('#eventSubmit');
	submit_element.click();
};
/**-------------------------------------------------------------------------------------------------------------------*/
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
	addTitleIcon('../../resources/pictures/Event-logo.png', true);
	detect_subContent_trigger_left_bar();
	setKeysAction('.form-content',view.triggerSubmit.bind(view));

}
