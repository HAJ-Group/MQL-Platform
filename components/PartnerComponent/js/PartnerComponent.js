/*Global Variables*/ 
let view; 
let service; 
/*Default class*/ 
function PartnerComponent(service) { 
	//TODO: Intitialize controller for PartnerComponent 
	current_component = 'Partner'; 
	loadResources(); 
	this.service = service; 
	//this.table = this.get('table-PartnerID'); Uncomment for apply dynamic data loading to a declared html tag by id (Add other tables if needed with associated methods)
	this.block=this.get('container');
	this.partners=this.get('partners');
	this.currentblock=null;
}
PartnerComponent.prototype.get = function (id) { 
	return document.getElementById(id); 
}; 
// Adding a row in the table member 
PartnerComponent.prototype.addPartnerRow = function (onePartner) { 
	let row = this.table.insertRow(); 
	//row.insertCell().innerHTML = news.id; 
	//TODO:INSERT DATA IN CELLS 
}; 
// Printing all service data into the table member 
PartnerComponent.prototype.printPartnerList = function () { 
	for (let i = 0; i < this.service.size(); i++) { 
		this.addPartnerRow(this.service.get(i)); 
	} 
};
PartnerComponent.prototype.addOnePartner = function (onePartner) {
	this.block.innerHTML +=
		'<div class="card" id="'+onePartner.name+'">' +
			'<div class="card-image">' +
				'<img src="'+onePartner.image+'" alt="">' +
			'</div>'+
			'<div class="card-body">' +
				'<div class="title">'+onePartner.name+'</div> <div class="ca">Chiffre d\'affaire :'+onePartner.ca+'</div>'+
				'<p class="description">'+onePartner.description+'</p>'+
				'<p class="colabs">Nombre de collobaroteurs de MQL chez CGi est :'+onePartner.nbr_colla+'</p>'+
				'<p class="website">Site web officiel : <a href="https://'+onePartner.website+'" target="_blank">'+onePartner.website+'</a></p>'+
			'</div>'
		;
};
PartnerComponent.prototype.addMenuPartners = function (onePartner) {
	this.partners.innerHTML +=
			'<div class="partner" onclick=view.show("'+onePartner.name+'")>'+onePartner.name+'</div>';
};
// Printing all service data into the table member
PartnerComponent.prototype.printPartners = function () {
	this.currentblock =""+this.service.get(0).name;
	for (let i = 0; i < this.service.size(); i++) {
		this.addMenuPartners(this.service.get(i));
	}
	for (let i = 0; i < this.service.size(); i++) {
		this.addOnePartner(this.service.get(i));
	}
};


PartnerComponent.prototype.show = function (id) {
    let hiddenblock=this.get(this.currentblock);
	let showblock = this.get(id);
	this.currentblock=id;
    hiddenblock.style.display = 'none';
    	showblock.style.display = 'block';
    showblock.style.animation = '0.5s ease-in 0s 1 slideInFromRight';


};
PartnerComponent.prototype.hidden = function () {
	for (let i = 1; i < this.service.size(); i++) {
		let partner = document.getElementsByClassName('card')[i];
		partner.style.display = 'none';
	}
};
/* Main Function */ 
function main() { 
	service = new PartnerComponentService(); 
	service.load(dbPartner);
	view = new PartnerComponent(service); 
	//view.printPartnerList(); Uncomment to print data in table member
	view.printPartners();
	view.hidden();
} 
