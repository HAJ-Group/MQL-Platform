/*Global Variables*/
let current_page_number = 1;
const MAX_PROMOTION_PER_PAGE = 5;
const DEFAULT_TOP_PROFILE_IMAGE = {M:'../../resources/pictures/top-profile.jpg', F:'../../resources/pictures/top-profile-female.jpg'};
const DEFAULT_PROFILE_IMAGE = {M:'../../resources/pictures/profile.png', F:'../../resources/pictures/profile-female.png'};
/*Default class*/ 
function LaureateComponent(service) { 
	//TODO: Intitialize controller for LaureateComponent 
	current_component = 'Laureate'; 
	loadResources(); 
	this.service = service; 
	//this.table = this.get('table-LaureateID'); Uncomment for apply dynamic data loading to a declared html tag by id (Add other tables if needed with associated methods)
	this.page_blocks = split(this.service.db, MAX_PROMOTION_PER_PAGE);
	this.block_nav = this.$('navigation');
	this.block_main = this.$('main');
	this.block_switch = this.$('switcher');
	this.block_recommendation=this.$('list-recommendation');
	this.htmlSaver = {
		nav: this.block_nav.innerHTML,
		main: this.block_main.innerHTML,
		switcher: this.block_switch.innerHTML,
	};
} 
LaureateComponent.prototype.$ = function (id) {
	if(id.startsWith('.')) return document.getElementsByClassName(id.substring(1));
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
	for(let promotion of this.page_blocks[current_page_number - 1]) {
		htmlContent += '<hr>\n' +
			'<div><a class="menuitem" href="#' + promotion.id + '">' + promotion.name + '</a></div>\n';
	}
	this.block_nav.innerHTML = htmlContent;
};

// Printing all service data into the table member 

LaureateComponent.prototype.fillMain = function () {
	let htmlContent = this.htmlSaver.main;
	let img;
	for(let promotion of this.page_blocks[current_page_number - 1]) {
		htmlContent +=
			'<div id="' + promotion.id + '" >' +
			'<div class="title">\n' + promotion.name + '</div>' +
			'<div class="details">' +
			'<p class="date">' + promotion.date.getFullYear()+ '</p>';
		for (let laureate of promotion.content) {
			if((laureate.photo === '')){
				img = DEFAULT_PROFILE_IMAGE[laureate.gender];
			} else img = laureate.photo;
			// LIST ITEM
			htmlContent += '<div id="item-' + promotion.id + '-' + laureate.id + '" class="card-laureate">\n' +
				'<div class="item-description">\n' +
				'<div class="item-element" onclick="view.showInfos(\'' + promotion.id + '-' + laureate.id + '\')"> ' + laureate.name +' ('+laureate.job+') '+
				'<span onclick="window.location.href=\'' + laureate.linked_in + '\'" class="linkedin"></span></div>\n' +
				'</div></div>';
			// INFO BODY
			htmlContent += '<div id="' + promotion.id + '-' + laureate.id + '" class="card-laureate" style="display: none">\n' +
				'<img src="' + img + '" alt="">' +
				'<div class="description">\n' +
				'<div class="element"  onclick="view.hideInfos(\'' + promotion.id + '-' + laureate.id + '\')">' + laureate.name +
				'<span onclick="window.location.href=\'' + laureate.linked_in + '\'" class="linkedin"></span></div>\n' +
				'<div class="card-desc">' +
				'<ul>';
			// ENTERPRISE && CITY
			if(laureate.current_enterprise !== '' && laureate.city !== '') {
				htmlContent += '<li>Entreprise: <span class="value">' + laureate.current_enterprise + ', ' + laureate.city + '</span></li>';
			}
			// STAGE
			if(laureate.stage !== '') {
				htmlContent += '<li>Stage : <span class="value">' + laureate.stage + '</span></li>';
			}
			// EXPERIENCES
			if(laureate.experience.length!==0) {
				htmlContent += '<li>Expériences : <span class="value"> '+laureate.experience+' </span></li>' ;
			}
			// Email :
			htmlContent+='<li>Email : <span class="value"><a href="mailto:' + laureate.email + '">' + laureate.email + '</a></span></li><hr>';
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
LaureateComponent.prototype.fillRecomondation =function(){
	let img;
	let html_content='';
	for(let promotion of this.service.db){
		for(let laureate of promotion.content){
			if(laureate.special){
				if(laureate.photo === ''){
					img = DEFAULT_TOP_PROFILE_IMAGE[laureate.gender];
				}
				else img = laureate.photo;
				html_content+='<div class="recommendation">' +
					'<div class="image-and-infos">' +
					'<div class="image-person">' +
					'<img  src="' + img + '" alt="">' +
					'</div>' +
					'<div class="infos">' +
					'<div class="name">' +
					laureate.name+
					'</div>' +
					'<div class="society">' +
					laureate.job+' à '+laureate.current_enterprise+
					'</div>' +
					'</div>' +
					'</div>' +
					'<div class="opinion">' +
					'<p>' +
					'<q>' +
					laureate.rating+
					'</q>' +
					'</p>' +
					'</div>' +
					'</div>'
			}
		}
	}
	this.block_recommendation.innerHTML = html_content;
};
/**
 * Create page switcher dynamically
 */
LaureateComponent.prototype.fillSwitcher = function () {
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
LaureateComponent.prototype.navigate = function(page_number=1, top=false) {
	current_page_number = page_number;
	this.fillNavigation();
	this.fillMain();
	this.fillSwitcher();
	addTitleIcon('../../resources/pictures/laureate-logo.png', true);
	detect_subContent_trigger_left_bar();
	if(top) window.location.href = '#header';
};

// Print PROMOTIONS :
LaureateComponent.prototype.printPromotionsCards = function () {
	for (let i = 0; i < this.service.size(); i++) {
		this.addLaureateRow(this.service.get(i));
	}
};
// Collapse cards
LaureateComponent.prototype.showInfos = function(id) {
	let item = this.$('item-' + id);
	item.style['display'] = 'none';
	let info = this.$(id);
	if(window.innerWidth <= 700){
		info.style['display']= 'block';
	}
	else info.style['display']= 'flex';
};
LaureateComponent.prototype.hideInfos = function (id) {
	let item = this.$('item-' + id);
	if(window.innerWidth <= 700){
		item.style['display'] = 'block';
	}
	else item.style['display'] = 'flex';
	let info = this.$(id);
	info.style['display'] = 'none';
};
LaureateComponent.prototype.updateView = function () {
	//
};

/**
 * Filtering function works with search box
 */
LaureateComponent.prototype.filterKey = function () {
	let key = this.$('key').value;
	if(key === '') {
		// LOAD ALL DATA
		this.page_blocks = split(this.service.db, MAX_PROMOTION_PER_PAGE);
	} else {
		// LOAD BY KEY
		this.page_blocks = split(this.service.searchByKey(key), MAX_PROMOTION_PER_PAGE);
	}
	if(this.page_blocks.length === 0) {
		popTB('../../resources/pictures/nf.png', 'LAUREATE NOT FOUND !!');
		this.$('key').value = '';
		this.filterKey();
	}
	this.navigate();
};

/* FORM SERVICES */
LaureateComponent.prototype.addData = function() {
	this.$('promotionSubmit').setAttribute('onclick', 'view.submitData()');
	popFORM();
};

LaureateComponent.prototype.editData = function(index) {
	let el_name = this.$('promotionName');
	//....
	let target = this.service.get(index);
	el_name.value = target.name;
	//...
	this.$('promotionSubmit').setAttribute('onclick', 'view.submitData(\'edit\', ' + index + ')');
	popFORM();
};

LaureateComponent.prototype.deleteData = function(index) {
	if(confirm('Are you sure you want to delete this Promotion ?')) {
		this.service.remove(index);
		//....
		this.page_blocks = split(this.service.db, MAX_PROMOTION_PER_PAGE);
		this.navigate();
	}
};

LaureateComponent.prototype.submitData = function (action = 'add', index = '0') {
	// GETTING DATA MEMBERS
	let name = this.$('promotionName').value;
	//...
	if(action === 'add') {
		this.service.add(new Promotion(this.service.size() + 1,name,new Date()));
	}
	if(action === 'edit') {
		let target = this.service.get(index);
		target.name = name;
		//...
		this.$('promotionSubmit').setAttribute('onclick', 'view.submitData()');
	}
	this.service.sort();
	this.page_blocks = split(this.service.db, MAX_PROMOTION_PER_PAGE);
	closeFORM();
	this.navigate();
};

