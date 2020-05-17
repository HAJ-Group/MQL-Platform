/*Global Variables*/ 
let view; 
let service; 
/*Default class*/ 
function NewsComponent(service) { 
	current_component = 'News';
	loadResources(); 
	this.service = service;
}
NewsComponent.prototype.get = function (id) {
	return document.getElementById(id);
};
NewsComponent.prototype.addNews=function (news) {
	let row=this.table_news.insertRow();
	row.insertCell().innerHTML =news.date;
	row.insertCell().innerHTML =news.title;
};
NewsComponent.prototype.printNews=function (max = this.service.size()) {
	for (let i = 0; i < max; i++) {
		this.addNews(this.service.get(i));
	}
};
/* Main Function */ 
function main() { 
	service = new NewsComponentService();
	service.load(dbNews);
	view = new NewsComponent(service);
	view.printNews();
} 
