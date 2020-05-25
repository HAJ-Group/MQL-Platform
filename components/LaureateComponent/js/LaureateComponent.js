/*Global Variables*/ 
let view; 
let service;
let current_page_number = 1;
const MAX_PROMOTION_PER_PAGE = 5;
const DEFAULT_PROFILE_IMAGE = '../../resources/pictures/profile.png';
/*Default class*/ 
function LaureateComponent(service) { 
	//TODO: Intitialize controller for LaureateComponent 
	current_component = 'Laureate'; 
	loadResources(); 
	this.service = service; 
	//this.table = this.get('table-LaureateID'); Uncomment for apply dynamic data loading to a declared html tag by id (Add other tables if needed with associated methods)
	this.page_blocks = split(this.service.dbP, MAX_PROMOTION_PER_PAGE);
	this.block_nav = this.get('navigation');
	this.block_main = this.get('main');
	/*this.block_switch = this.get('switcher');*/
	this.htmlSaver = {
		nav: this.block_nav.innerHTML,
		main: this.block_main.innerHTML,
		// switcher: this.block_switch.innerHTML,
	};
} 
LaureateComponent.prototype.get = function (id) { 
	return document.getElementById(id); 
}; 
// Adding a row in the table member 
LaureateComponent.prototype.addLaureateRow = function (oneLaureate) { 
	let row = this.table.insertRow(); 
	//row.insertCell().innerHTML = news.id; 
	//TODO:INSERT DATA IN CELLS 
};

/**
 * Create navigation menu dynamically
 */
LaureateComponent.prototype.fillNavigation = function () {
	let htmlContent = this.htmlSaver.nav;
	for(let promotion of this.service.dbP) {
		htmlContent += '<hr>\n' +
			'<div><a class="menuitem" href="#' + promotion.id + '">' + promotion.name + '</a></div>\n';
	}
	this.block_nav.innerHTML = htmlContent;
};

// Printing all service data into the table member 

LaureateComponent.prototype.fillMain = function () {
	let htmlContent = this.htmlSaver.main;
	for(let promotion of this.service.dbP) {
		htmlContent +=
			'<div id="' + promotion.id + '" >' +
			'<div class="title">\n' + promotion.name + '</div>' +
			'<div class="details">';
		for (let laureate of promotion.content) {
			if((laureate.photo === '')) laureate.photo = DEFAULT_PROFILE_IMAGE;
			// LIST ITEM
			htmlContent += '<div id="item-' + promotion.id + '-' + laureate.id + '" class="card-laureate">\n' +
				'<div class="item-description">\n' +
				'<div class="item-element" onclick="view.showInfos(\'' + promotion.id + '-' + laureate.id + '\')">' + laureate.name +
				'<span onclick="window.location.href=\'' + laureate.linked_in + '\'" class="linkedin"></span></div>\n' +
				'</div></div>';
			// INFO BODY
			htmlContent += '<div id="' + promotion.id + '-' + laureate.id + '" class="card-laureate" style="display: none">\n' +
				'<img src="' + laureate.photo + '" alt="">' +
				'<div class="description">\n' +
				'<div class="element"  onclick="view.hideInfos(\'' + promotion.id + '-' + laureate.id + '\')">' + laureate.name +
				'<span onclick="window.location.href=\'' + laureate.linked_in + '\'" class="linkedin"></span></div>\n' +
				'<div class="card-desc">' +
				'<ul>';
			// STAGE
			if(laureate.stage !== '') {
				htmlContent += '<li>Stage<span class="value">' + laureate.stage + '</span></li>';
			}
			// EXPERIENCES
			if(laureate.experience !== []) {
				htmlContent += '<li>Expériences<span class="value">';
				for(let exp of laureate.experience) {
					htmlContent += '<span class="left-space">' + exp + '</span>';
				}
				htmlContent += '</span></li>';
			}
			// ENTERPRISE && CITY
			if(laureate.current_enterprise !== '' && laureate.city !== '') {
				htmlContent += '<li>Travaille chez<span class="value">' + laureate.current_enterprise + ', ' + laureate.city + '</span></li>' +
					'<li>Email<span class="value"><a href="mailto:' + laureate.email + '">' + laureate.email + '</a></span></li><hr>';
			}
			// DESCRIPTION
			if(laureate.rating !== ''){
				htmlContent += '<div class="quotes"></div><p class="rating">' + laureate.rating + '</p>'
			}
			htmlContent += '</ul></div></div></div>';
		}
		htmlContent+='</div></div>' ;
	}
	this.block_main.innerHTML = htmlContent;
};
// Print PROMOTIONS :
LaureateComponent.prototype.printPromotionsCards = function () {
	for (let i = 0; i < this.service.size(); i++) {
		this.addLaureateRow(this.service.get(i));
	}
};
// Collapse cards
LaureateComponent.prototype.showInfos = function(id) {
	let item = this.get('item-' + id);
	item.style.display = 'none';
	let info = this.get(id);
	if(window.innerWidth <= 700){
		info.style.display = 'block';
	}
	else info.style.display = 'flex';
};
LaureateComponent.prototype.hideInfos = function (id) {
	let item = this.get('item-' + id);
	if(window.innerWidth <= 700){
		item.style.display = 'block';
	}
	else item.style.display = 'flex';
	let info = this.get(id);
	info.style.display = 'none';
};
LaureateComponent.prototype.updateView = function () {
	if(window.innerWidth > 700){
		window.location.reload();
	}
};
/* Main Function */
function main() { 
	service = new LaureateComponentService(); 
	service.loadPromotion(dbPromotion);
	view = new LaureateComponent(service);
	view.fillNavigation();
	view.fillMain();
	// stays last
	addTitleIcon('../../resources/pictures/laureate-logo.png');
	detect_subContent_trigger_left_bar();
}
