/* Default Model for LaureateComponent */ 
function Promotion(name,content){
	this.name=name;
	this.content=content;
}
function Laureate(id,name,age,address,ville,email,stage,job,current_enterprise,experience='',photo='',rating='',linked_in='') {
	//TODO: Intitialize model properties
	this.id = id;
	this.name = name;
	this.age=age;
	this.address = address;
   	this.ville = ville;
   	this.email = email;
	this.stage = stage;
	this.job = job;
	this.current_enterprise = current_enterprise;
	this.experience = experience;
	this.photo = photo;
	this.rating = rating;
	this.linked_in = linked_in;
}
