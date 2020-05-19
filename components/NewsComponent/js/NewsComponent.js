/*Global Variables*/ 
let view; 
let service;
let current_page_number = 1;
/*Default class*/ 
function NewsComponent(service) { 
	current_component = 'News';
	loadResources(); 
	this.service = service;
	// this.table = this.get('table-NewsID');
	this.block_nav = this.get('navigation');
	this.block_main = this.get('main');
	this.block_switch = this.get('switcher');
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

NewsComponent.prototype.fillNavigation = function () {
	let htmlContent = this.block_nav.innerHTML;
	for(let news of this.service.db) {
		htmlContent += '<hr>\n' +
			'<div><a class="menuitem" href="#' + news.id + '">' + news.title + '</a></div>\n';
	}
	this.block_nav.innerHTML = htmlContent;
};

NewsComponent.prototype.fillMain = function () {
	let htmlContent = this.block_main.innerHTML;
	for(let news of this.service.db) {
		htmlContent += '<div id="' + news.id + '"">\n' +
			'<div class="title">\n' +
			news.title +
			'</div>\n' +
			'<div class="details">' +
			'<p class="date">' + news.date + '</p>' +
			'<p>' + news.description + '</p>\n' +
			'</div>\n' +
			'</div>';
	}
	this.block_main.innerHTML = htmlContent;
};

NewsComponent.prototype.fillSwitcher = function () {
	let htmlContent = this.block_switch.innerHTML;
	let pages = split(this.service.db, 10).length;
	for(let i = 0; i<pages; i++) {
		if(current_page_number === i) htmlContent += '<span class="active-page"><a>' + (i+1) + '</a></span>';
		else htmlContent += '<span><a>' + (i+1) + '</a></span>';
	}
	this.block_switch.innerHTML = htmlContent;
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
	addTitleIcon('../../resources/pictures/News-logo.png');
} 
