/*Global Variables*/ 
let view; 
let service;

/*Default class*/ 
function EventComponent(service) { 
	//TODO: Intitialize controller for EventComponent 
	current_component = 'Event'; 
	loadResources(); 
	this.service = service; 
	//this.table = this.get('table-EventID'); Uncomment for apply dynamic data loading to a declared html tag by id (Add other tables if needed with associated methods)
	//this.block_main = this.get('main');
	this.htmlSaver = {
	};
} 
EventComponent.prototype.get = function (id) { 
	return document.getElementById(id); 
}; 
// Adding a row in the table member 
// EventComponent.prototype.addEventRow = function (oneEvent) {
// 	let row = this.table.insertRow();
// 	//row.insertCell().innerHTML = news.id;
// 	//TODO:INSERT DATA IN CELLS
// };
// // Printing all service data into the table member
// EventComponent.prototype.printEventList = function () {
// 	for (let i = 0; i < this.service.size(); i++) {
// 		this.addEventRow(this.service.get(i));
// 	}
// };

/* Dynamic Event */
/*EventComponent.prototype.fillMain = function () {
	let htmlContent = this.htmlSaver.main;
	for(let event of this.service.db) {
		htmlContent += ''
	}
	this.block_main.innerHTML = htmlContent;
};*/


// Printing all service data into the table member
EventComponent.prototype.printEventList = function () {
	for (let i = 0; i < this.service.size(); i++) {
		//this.addEvent(this.service.get(i));
	}
};
/* Main Function */ 
function main() { 
	service = new EventComponentService(); 
	//service.load(dbEvent);
	view = new EventComponent(service); 
	//view.printEventList(); Uncomment to print data in table member
	//view.fillMain();
	addTitleIcon('../../resources/pictures/Event-logo.png');
}
