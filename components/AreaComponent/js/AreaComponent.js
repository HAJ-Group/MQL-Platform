/*Global Variables*/ 
let view; 
let service; 
/*Default class*/ 
function AreaComponent(service) { 
	//TODO: Intitialize controller for AreaComponent 
	current_component = 'Area'; 
	loadResources(); 
	this.service = service; 
} 
/* Main Function */ 
function main() { 
	service = new AreaComponentService(); 
	view = new AreaComponent(service); 
} 
