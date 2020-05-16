/*Global Variables*/ 
let view; 
let service; 
/*Default class*/ 
function PresentationComponent(service) { 
	//TODO: Intitialize controller for PresentationComponent 
	current_component = 'Presentation'; 
	loadResources(); 
	this.service = service; 
} 
/* Main Function */ 
function main() { 
	service = new PresentationComponentService(); 
	view = new PresentationComponent(service); 
} 
