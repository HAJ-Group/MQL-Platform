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
		htmlContent += '<div id="' + news.id + '" ' +
			'onmouseover="lightNav(' + news.id + ')" ' +
			'onmouseleave="offLight(' + news.id + ')">\n' +
			'<div class="title">\n' +
			news.title +
			'</div>\n' +
			'<div class="details">' +
			'<p class="date">' + news.date + '</p>' +
			'<p>' + news.description + '</p>\n' +
			'<div class="row"><span class="column">';
		for(let image of news.images) {
			htmlContent += '<img onclick="popIMG(this.id)" id="id_' + image + '" src="../../resources/pictures/' + image + '" alt="">\n';
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
NewsComponent.prototype.navigate = function(page_number, top=false) {
	current_page_number = page_number;
	this.fillNavigation();
	this.fillMain();
	this.fillSwitcher();
    addTitleIcon('../../resources/pictures/News-logo.png');
    if(top) window.location.href = '#header';
};

NewsComponent.prototype.trigger = function () {
	let anchor = window.location.href.split('#')[1];
	if(anchor !== undefined) {
		this.get('nav' + anchor).click();
	}
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
	view.navigate(current_page_number);
	// stays last
	addTitleIcon('../../resources/pictures/News-logo.png');
	detect_subContent_trigger_left_bar();
	view.trigger();
}

