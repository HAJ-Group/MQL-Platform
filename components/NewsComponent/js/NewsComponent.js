/*Global Variables*/ 
let view; 
let service; 
/*Default class*/ 
function NewsComponent(service) { 
	current_component = 'News';
	loadResources(); 
	this.service = service; 
}
HomeComponent.prototype.get = function (id) {
	return document.getElementById(id);
};
/* Main Function */ 
function main() { 
	service = new NewsComponentService(); 
	view = new NewsComponent(service); 
} 
