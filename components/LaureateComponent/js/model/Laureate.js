/* Default Model for LaureateComponent */ 
function Promotion(id,name,content){
	this.id=id;
	this.name=name;
	this.content=content;
}
function Laureate(id,name,city,email,stage,current_enterprise,experience='',photo='',rating='',linked_in='') {
	//TODO: Intitialize model properties
	this.id = id;
	this.name = name;
	this.city = city;
   	this.email = email;
	this.stage = stage;
	this.current_enterprise = current_enterprise;
	this.experience = experience;
	this.photo = photo;
	this.rating = rating;
	this.linked_in = linked_in;
}