/*Global Variables*/ 
let view; 
let service; 
/*Default class*/ 
function EventComponent(service) { 
	//TODO: Intitialize controller for EventComponent 
	current_component = 'Event'; 
	loadResources(); 
	this.service = service; 
} 
/* Main Function */ 
function main() { 
	service = new EventComponentService(); 
	view = new EventComponent(service); 
} 
