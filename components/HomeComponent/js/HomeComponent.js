/*Global Variables*/ 
let view; 
let service;
/*Default class*/ 
function HomeComponent(service) { 
	//TODO: Intitialize controller for HomeComponent
	current_component = 'Home';
	loadResources();
	this.service = service;
	this.table=this.get("table-program");
	this.addTitleIcon('../../resources/pictures/title-logo.png');
}
HomeComponent.prototype.get = function (id) {
	return document.getElementById(id);
};

HomeComponent.prototype.addColumn=function (program) {
	var row=this.table.insertRow();
	var cell=row.insertCell();
	cell.innerHTML += "<span class='semester'>Semestre"+program.id +"</span>" + "<hr>" + "<ul>";
	for (let i = 0; i < program.modules.length ; i++) {
		cell.innerHTML+="<li>"+"M"+(i+1)+" : "+program.modules[i]+"</li>";
	}
	cell.innerHTML += "</ul>" +" <br>";
};
HomeComponent.prototype.printSemesters=function () {
	for (let i = 0; i < this.service.size(); i++) {
		this.addColumn(this.service.get(i));
	}
};
HomeComponent.prototype.addTitleIcon = function(source) {
	let titles = document.getElementsByClassName('title');
	let i=0;
	for (let title of titles) {
		let text = title.textContent;
		title.innerHTML = '<img src="' + source + '" alt="title" class="title-logo">' + text+'<img name="sh-icon" src="../../resources/pictures/icons/minus-icon.png"  class="sh-icon" onclick="view.hide('+i+')">'+'<span class="sh-sep"></span>';
		i++;
	}
};
HomeComponent.prototype.show = function (id) {
	let icon = document.getElementsByName('sh-icon')[id];
	let sep = document.getElementsByClassName('sh-sep')[id];
	icon.setAttribute('src','../../resources/pictures/icons/minus-icon.png');
	icon.setAttribute('onclick','view.hide('+id+')');
	let element =document.getElementsByClassName('details')[id];
	element.style.display = 'block';
	sep.style.display='none';
};
HomeComponent.prototype.hide = function (id) {
	let icon = document.getElementsByName('sh-icon')[id];
	let sep = document.getElementsByClassName('sh-sep')[id];
	icon.setAttribute('src','../../resources/pictures/icons/plus-icon.png');
	icon.setAttribute('onclick','view.show('+id+')');
	let element =document.getElementsByClassName('details')[id];
	element.style.display = 'none';
	sep.style.display='block';
};
/* Main Function */
function main() {
	service = new HomeComponentService();
	service.load(db);
	view = new HomeComponent(service);
	view.printSemesters();
}
