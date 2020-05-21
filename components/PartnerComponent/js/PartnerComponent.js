/*Global Variables*/ 
let view; 
let service; 
/*Default class*/ 
function PartnerComponent(service) { 
	//TODO: Intitialize controller for PartnerComponent 
	current_component = 'Partner'; 
	loadResources(); 
	this.service = service; 
	//this.table = this.get('table-PartnerID'); Uncomment for apply dynamic data loading to a declared html tag by id (Add other tables if needed with associated methods) 
} 
PartnerComponent.prototype.get = function (id) { 
	return document.getElementById(id); 
}; 
// Adding a row in the table member 
PartnerComponent.prototype.addPartnerRow = function (onePartner) { 
	let row = this.table.insertRow(); 
	//row.insertCell().innerHTML = news.id; 
	//TODO:INSERT DATA IN CELLS 
}; 
// Printing all service data into the table member 
PartnerComponent.prototype.printPartnerList = function () { 
	for (let i = 0; i < this.service.size(); i++) { 
		this.addPartnerRow(this.service.get(i)); 
	} 
}; 
/* Main Function */ 
function main() { 
	service = new PartnerComponentService(); 
	//service.load(dbPartner); Uncomment to load data for dynamic use 
	view = new PartnerComponent(service); 
	//view.printPartnerList(); Uncomment to print data in table member 
} 
