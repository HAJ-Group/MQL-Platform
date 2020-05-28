/*Global Variables*/ 
let view; 
let service;
let current_page_number = 1;
const MAX_NEWS_PER_PAGE = 5;
/*Default class*/ 
function NewsComponent(service) { 
	current_component = 'News';
	loadResources(); 
	this.service = service;
	// this.table = this.get('table-NewsID');
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
NewsComponent.prototype.get = function (id) {
	return document.getElementById(id);
};
NewsComponent.prototype.addNewsRow =function (news) {
	let row=this.table.insertRow();
	row.insertCell().innerHTML =news.date;
	row.insertCell().innerHTML =news.title;
};
NewsComponent.prototype.printNewsList = function (max = this.service.size()) {
	for (let i = 0; i < max; i++) {
		this.addNewsRow(this.service.get(i));
	}
};

/**
 * Create navigation menu dynamically
 */
NewsComponent.prototype.fillNavigation = function () {
	let htmlContent = this.htmlSaver.nav;
	for(let news of this.page_blocks[current_page_number - 1]) {
		htmlContent += '<hr>\n' +
			'<div><a class="menuitem" href="#' + news.id + '">' + news.title + '</a></div>\n';
	}
	this.block_nav.innerHTML = htmlContent;
};

/**
 * Create main block dynamically
 */
NewsComponent.prototype.fillMain = function () {
	let htmlContent = this.htmlSaver.main;
	for(let news of this.page_blocks[current_page_number - 1]) {
		htmlContent += '<div id="' + news.id + '" >' +
			'<div class="title">\n' + news.title + '</div>\n' +
			'<div class="details">' +
			'<p class="date">' + formattedDate(news.date) + '</p>' +
			'<p>' + news.description + '</p>\n' +
			'<div class="row"><span class="column">';
		for(let image of news.images) {
			htmlContent += '<img onclick="popIMG(this.id)" id="id_' + image + '" src="../../resources/pictures/' + image + '" alt="MQL PLATFORM">\n';
		}
		htmlContent += '</span></div>\n</div>\n' +	'</div>';
	}
	this.block_main.innerHTML = htmlContent;
};

/**
 * Create page switcher dynamically
 */
NewsComponent.prototype.fillSwitcher = function () {
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
NewsComponent.prototype.navigate = function(page_number=1, top=false) {
	current_page_number = page_number;
	this.fillNavigation();
	this.fillMain();
	this.fillSwitcher();
    addTitleIcon('../../resources/pictures/News-logo.png', true);
	detect_subContent_trigger_left_bar();
    if(top) window.location.href = '#header';
};

NewsComponent.prototype.trigger = function () {
	let anchor = window.location.href.split('#')[1];
	if(anchor !== undefined && anchor !== 'header') {
		this.get('nav' + anchor).click();
	}
};

/**
 * Filtering function works with search box
 */
NewsComponent.prototype.filterKey = function () {
	let key = this.get('key').value;
	if(key === '') {
		// LOAD ALL DATA
		this.page_blocks = split(this.service.db, MAX_NEWS_PER_PAGE);
	} else {
		// LOAD BY KEY
		this.page_blocks = split(this.service.searchByKey(key), MAX_NEWS_PER_PAGE);
		console.log(this.service.searchByKey(key));
	}
	if(this.page_blocks.length === 0) {
		popTB('../../resources/pictures/nf.png', 'NEWS NOT FOUND !!');
		this.get('key').value = '';
		this.filterKey();
	}
	this.navigate();
};

/* FORM SERVICES */
NewsComponent.prototype.addData = function() {
	this.get('newsSubmit').setAttribute('onclick', 'view.submitData()');
	popFORM();
};

NewsComponent.prototype.editData = function(index) {
	let el_title = this.get('newsTitle');
	let el_desc = this.get('newsDescription');
	//....
	let target = this.service.get(index);
	el_title.value = target.title;
	el_desc.value = target.description;
	//...
	this.get('newsSubmit').setAttribute('onclick', 'view.submitData(\'edit\', ' + index + ')');
	popFORM();
};

NewsComponent.prototype.deleteData = function(index) {
	if(confirm('Are you sure you want to delete this News ?')) {
		this.service.remove(index);
		//....
		this.page_blocks = split(this.service.db, MAX_NEWS_PER_PAGE);
		this.navigate();
	}
};

NewsComponent.prototype.submitData = function (action = 'add', index = '0') {
	// GETTING DATA MEMBERS
	let title = this.get('newsTitle').value;
	let desc = this.get('newsDescription').value;
	//...
	if(action === 'add') {
		this.service.add(new News(this.service.size() + 1, title, new Date(), desc));
	}
	if(action === 'edit') {
		let target = this.service.get(index);
		target.title = title;
		target.description = desc;
		//...
		this.get('newsSubmit').setAttribute('onclick', 'view.submitData()');
	}
	this.service.sort();
	this.page_blocks = split(this.service.db, MAX_NEWS_PER_PAGE);
	closeFORM();
	this.navigate();
};

/* Main Function */ 
function main() { 
	service = new NewsComponentService();
	service.load(dbNews);
	view = new NewsComponent(service);
	//view.printNewsList();
	view.fillNavigation();
	view.fillMain();
	view.fillSwitcher();
	// stays last
	addTitleIcon('../../resources/pictures/News-logo.png', true);
	detect_subContent_trigger_left_bar();
	view.trigger();
}

