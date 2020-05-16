/*Global Variables*/ 
let view; 
let service;
/*Default class*/ 
function HomeComponent(service) { 
	//TODO: Intitialize controller for HomeComponent
	loadResources();
	this.service = service;
	this.table=this.get("table-program");
} 
HomeComponent.prototype.get = function (id) {
	return document.getElementById(id);
}
HomeComponent.prototype.addColumn=function (program) {
	var row=this.table.insertRow();
	var cell=row.insertCell();
	cell.innerHTML += "<span class='semester'> Semestre "+program.id +" </span>"+"<hr>"+"<ul>";
	for (let i = 0; i < program.modules.length ; i++) {
		cell.innerHTML+="<li>"+"M"+(i+1)+" : "+program.modules[i]+"</li>";
	}
	cell.innerHTML += "</ul>" +" <br>";
}
HomeComponent.prototype.printSemesters=function () {
	for (let i = 0; i < this.service.size(); i++) {
		this.addColumn(this.service.get(i));
	}
}
/* Main Function */ 
function main() {
	service = new HomeComponentService();
	service.load(db);
	view = new HomeComponent(service);
	view.printSemesters();
} 
