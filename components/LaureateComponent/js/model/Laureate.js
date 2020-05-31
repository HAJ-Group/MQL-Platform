/* Default Model for LaureateComponent */ 
function Promotion(id,name,date,content=[]){
	this.id=id;
	this.name=name;
	this.date=date;
	this.content=content;
}
function Laureate(id,name,gender,job,city,email,stage,current_enterprise,experience='',photo='',rating='',linked_in='') {
	//TODO: Intitialize model properties
	this.id = id;
	this.name = name;
	this.gender = gender;
	this.job=job;
	this.city = city;
   	this.email = email;
	this.stage = stage;
	this.current_enterprise = current_enterprise;
	this.experience = experience;
	this.photo = photo;
	this.rating = rating;
	this.linked_in = linked_in;
}
