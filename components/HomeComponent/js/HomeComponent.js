/*Global Variables*/ 
let view; 
let service; 
/*Default class*/ 
function HomeComponent(service) { 
	//TODO: Intitialize controller for HomeComponent 
	this.service = service; 
} 
/* Main Function */ 
function main() {
	service = new HomeComponentService(); 
	view = new HomeComponent(service); 
} 
