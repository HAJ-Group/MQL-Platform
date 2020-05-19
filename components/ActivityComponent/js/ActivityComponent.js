/*Global Variables*/ 
let view; 
let service; 
/*Default class*/ 
function ActivityComponent(service) { 
	//TODO: Intitialize controller for ActivityComponent 
	current_component = 'Activity'; 
	loadResources(); 
	this.service = service; 
	//this.table = this.get('table-ActivityID'); Uncomment for apply dynamic data loading to a declared html tag by id (Add other tables if needed with associated methods) 
} 
ActivityComponent.prototype.get = function (id) { 
	return document.getElementById(id); 
}; 
// Adding a row in the table member 
ActivityComponent.prototype.addActivityRow = function (oneActivity) { 
	let row = this.table.insertRow(); 
	//row.insertCell().innerHTML = news.id; 
	//TODO:INSERT DATA IN CELLS 
}; 
// Printing all service data into the table member 
ActivityComponent.prototype.printActivityList = function () { 
	for (let i = 0; i < this.service.size(); i++) { 
		this.addActivityRow(this.service.get(i)); 
	} 
}; 
/* Main Function */ 
function main() { 
	service = new ActivityComponentService(); 
	//service.load(dbActivity); Uncomment to load data for dynamic use 
	view = new ActivityComponent(service); 
	//view.printActivityList(); Uncomment to print data in table member 
} 
