/*Global Variables*/ 
let view; 
let service;
let current_page_number = 1;
const MAX_PROMOTION_PER_PAGE = 5;
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
	this.block_switch = this.get('switcher');
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
			'<div><a class="menuitem" href="#' + promotion.name + '">' + promotion.name + '</a></div>\n';
	}
	this.block_nav.innerHTML = htmlContent;
};

// Printing all service data into the table member 

LaureateComponent.prototype.fillMain = function () {
	let htmlContent = this.htmlSaver.main;
	for(let promotion of this.service.dbP) {
		htmlContent +=
			'<div id="' + promotion.name + '" >' +
			'<div class="title">\n' + promotion.name + '</div>' +
			'<div class="details">';
		console.log(promotion)
		for (let laureate of promotion.content){
			htmlContent += '<div class="card-laureate">'+
                '<div class="card-image">'+
                  '<img class="img" src="'+laureate.photo+'" alt="Promo">'+
                  '<div class="name">Name :'+laureate.name+'</div>'+
                  '<div class="stage">Stage:'+laureate.stage+'</div>'+
                  '<div class="job">Job '+laureate.job+': , à: '+laureate.current_enterprise+' </div>'+
                  '<div class="experience">Expérience: '+laureate.experience+'</div>'+
                '</div>'+
                '<div class="card-desc">'+
                    '<ul>'+
                        '<li>age:'+laureate.age+'</li>'+
                        '<li>address:'+laureate.address+'</li>'+
                        '<li>Ville : '+laureate.ville+'</li>'+
                        '<li>Email : '+laureate.email+'</li>'+
                        '<li>LinkedIn: '+laureate.linked_in+' </li>'+
                    '</ul>'+
                '</div>'+
                '<div class="card-reco">'+
                     laureate.rating
				+'</div>'+
            '</div> <br>';
		}
		htmlContent+='</div></div>' ;
			//'<div class="details">' ;
		// 	'<p class="date">' + news.date + '</p>' +
		// 	'<p>' + news.description + '</p>\n' +
		// 	'<div class="row"><span class="column">';
		// for(let image of news.images) {
		// 	htmlContent += '<img onclick="popIMG(this.id)" id="id_' + image + '" src="../../resources/pictures/' + image + '" alt="MQL PLATFORM">\n';
		// }
		// htmlContent += '</span></div>\n</div>\n' +	'</div>';
	}
	this.block_main.innerHTML = htmlContent;
};
// Print PROMOTIONS :
LaureateComponent.prototype.printPromotionsCards = function () {
	for (let i = 0; i < this.service.size(); i++) {
		this.addLaureateRow(this.service.get(i));
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
	addTitleIcon('../../resources/pictures/News-logo.png');
	detect_subContent_trigger_left_bar();
}
