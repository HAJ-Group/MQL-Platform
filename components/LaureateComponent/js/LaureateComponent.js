/*Global Variables*/ 
let view; 
let service; 
/*Default class*/ 
function LaureateComponent(service) { 
	//TODO: Intitialize controller for LaureateComponent 
	current_component = 'Laureate'; 
	loadResources(); 
	this.service = service; 
	//this.table = this.get('table-LaureateID'); Uncomment for apply dynamic data loading to a declared html tag by id (Add other tables if needed with associated methods) 
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
// Printing all service data into the table member 
LaureateComponent.prototype.printLaureateList = function () { 
	for (let i = 0; i < this.service.size(); i++) { 
		this.addLaureateRow(this.service.get(i)); 
	} 
}; 
/* Main Function */ 
function main() { 
	service = new LaureateComponentService(); 
	//service.load(dbLaureate); Uncomment to load data for dynamic use 
	view = new LaureateComponent(service); 
	//view.printLaureateList(); Uncomment to print data in table member 
} 
