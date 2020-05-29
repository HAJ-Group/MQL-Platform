/*Default class*/
function HomeComponent(service) { 
	current_component = 'Home';
	loadResources();
	this.service = service;
	this.table=this.$("table-program");
	this.table_news=this.$("table-news");
	this.news_idSaver = [];
}

HomeComponent.prototype.$ = function (id) {
	if(id.startsWith('.')) return document.getElementsByClassName(id.substring(1));
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
	row.insertCell().innerHTML = formattedDate(news.date);
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

