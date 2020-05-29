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
	this.news_idSaver = [];
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
	this.news_idSaver.push(news.id);
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
 * News link managers
 */
HomeComponent.prototype.setNewsRoutes = function () {
	let rows = this.table_news.rows;
	for(let i=0; i<rows.length; i++) {
		let cells = rows[i].cells;
		for(let j=1; j<cells.length; j++) {
			cells[j].innerHTML = '<a onclick="route(\'../News\',' + (i+1) + ')">' + cells[j].innerHTML + '</a>';
		}
	}
};




/* Main Function */
function main() {
	service = new HomeComponentService();
	service.load(dbHomeProgram);
	view = new HomeComponent(service);
//	view.printSemesters();
	view.printNews();
	view.setNewsRoutes();

	// stays last
	addTitleIcon('../../resources/pictures/title-logo.png');
	detect_subContent_trigger_left_bar();
	createBook(dbHomeImages);
}


