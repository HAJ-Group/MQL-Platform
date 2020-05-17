/*Global Variables*/ 
let view; 
let service;
/*Default class*/ 
function HomeComponent(service) { 
	current_component = 'Home';
	loadResources();
	this.service = service;
	this.table=this.get("table-program");
	this.table_news=this.get("table-news");
	this.addTitleIcon('../../resources/pictures/title-logo.png');
}


HomeComponent.prototype.get = function (id) {
	return document.getElementById(id);
};

/**
 * Program table builder
 * @param program
 */
HomeComponent.prototype.addColumn=function (program) {
	let row=this.table.insertRow();
	let cell=row.insertCell();
	cell.innerHTML += "<span class='semester'>Semestre"+program.id +"</span>" + "<hr>" + "<ul>";
	for (let i = 0; i < program.modules.length ; i++) {
		cell.innerHTML+="<li>"+"M"+(i+1)+":"+program.modules[i]+"</li>";
	}
	cell.innerHTML += "</ul>" +"<br>";
};
HomeComponent.prototype.printSemesters=function () {
	for (let i = 0; i < this.service.size(); i++) {
		this.addColumn(this.service.get(i));
	}
};

/**
 * News Table builder (Related Service with NewsComponent)
 * @param news
 */
HomeComponent.prototype.addNews=function (news) {
	let row = this.table_news.insertRow();
	row.insertCell().innerHTML = news.date;
	row.insertCell().innerHTML = news.title;
};
HomeComponent.prototype.printNews=function (max = 5) {
	let service = new NewsComponentService();
	service.load(dbNews);
	for (let i = 0; i < max; i++) {
		this.addNews(service.get(i));
	}
};

/**
 * Building title configuration (icon + show and hide button)
 * @param source
 */
HomeComponent.prototype.addTitleIcon = function(source) {
	let titles = document.getElementsByClassName('title');
	let i=0;
	for (let title of titles) {
		let text = title.textContent;
		title.innerHTML = '<img src="' + source + '" alt="title" class="title-logo">' + text+'<img name="sh-icon" src="../../resources/pictures/icons/minus-icon.png"  class="sh-icon" onclick="view.hide('+i+')">'+'<span class="sh-sep"></span>';
		i++;
	}
};

/**
 * Action method show details block
 * @param id
 */
HomeComponent.prototype.show = function (id) {
	let icon = document.getElementsByName('sh-icon')[id];
	let sep = document.getElementsByClassName('sh-sep')[id];
	icon.setAttribute('src','../../resources/pictures/icons/minus-icon.png');
	icon.setAttribute('onclick','view.hide('+id+')');
	let element =document.getElementsByClassName('details')[id];
	element.style.display = 'block';
	sep.style.display='none';
};

/**
 * Action method hide details block
 * @param id
 */
HomeComponent.prototype.hide = function (id) {
	let icon = document.getElementsByName('sh-icon')[id];
	let sep = document.getElementsByClassName('sh-sep')[id];
	icon.setAttribute('src','../../resources/pictures/icons/plus-icon.png');
	icon.setAttribute('onclick','view.show('+id+')');
	let element = document.getElementsByClassName('details')[id];
	element.style.display = 'none';
	sep.style.display='block';
};

HomeComponent.prototype.toggleSlideLink = function () {
	let links = {
		'1':'#presentation',
		'2':'#mqlfamily',
		'3':'https://www.w3schools.com/default.asp',
		'4':'https://www.w3schools.com/default.asp',
		'5':'https://www.w3schools.com/default.asp',
		'6':'https://www.w3schools.com/default.asp',
	};
	let element = this.get('slide-show');
	let key = getComputedStyle(element).fontSize.split('.')[0];
	window.location.assign(links[key]);
};

/* Main Function */
function main() {
	service = new HomeComponentService();
	service.load(dbHome);
	view = new HomeComponent(service);
	view.printSemesters();
	view.printNews();
}
