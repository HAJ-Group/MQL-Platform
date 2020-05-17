/*Global Variables*/ 
let view; 
let service; 
/*Default class*/ 
function ActivityComponent(service) { 
	//TODO: Intitialize controller for ActivityComponent 
	current_component = 'Activity'; 
	loadResources(); 
	this.service = service; 
} 
/* Main Function */ 
function main() { 
	service = new ActivityComponentService(); 
	view = new ActivityComponent(service); 
} 
