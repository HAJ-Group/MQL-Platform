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
	addTitleIcon('../../resources/pictures/title-logo.png');
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
