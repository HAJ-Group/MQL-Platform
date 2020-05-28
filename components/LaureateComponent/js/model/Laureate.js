/* Default Model for LaureateComponent */ 
function Promotion(id,name,date,content=[]){
	this.id=id;
	this.name=name;
	this.date=date;
	this.content=content;
}
function Laureate(id,name,job,city,email,stage,current_enterprise,experience='',photo='',rating='',linked_in='',special) {
	//TODO: Intitialize model properties
	this.id = id;
	this.name = name;
	this.job=job;
	this.city = city;
   	this.email = email;
	this.stage = stage;
	this.current_enterprise = current_enterprise;
	this.experience = experience;
	this.photo = photo;
	this.rating = rating;
	this.linked_in = linked_in;
	if(special!==undefined)
		this.special=special;
}
