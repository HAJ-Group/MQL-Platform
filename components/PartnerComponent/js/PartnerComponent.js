/*Global Variables*/ 
let view; 
let service; 
/*Default class*/ 
function PartnerComponent(service) { 
	//TODO: Intitialize controller for PartnerComponent 
	current_component = 'Partner'; 
	loadResources(); 
	this.service = service; 
} 
/* Main Function */ 
function main() { 
	service = new PartnerComponentService(); 
	view = new PartnerComponent(service); 
} 
