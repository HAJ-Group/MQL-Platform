/*Global Variables*/ 
let view; 
let service; 
/*Default class*/ 
function LaureateComponent(service) { 
	//TODO: Intitialize controller for LaureateComponent 
	current_component = 'Laureate'; 
	loadResources(); 
	this.service = service; 
} 
/* Main Function */ 
function main() { 
	service = new LaureateComponentService(); 
	view = new LaureateComponent(service); 
} 
