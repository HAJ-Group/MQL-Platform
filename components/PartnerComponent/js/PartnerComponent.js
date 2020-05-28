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
				'<img src="'+onePartner.bg+'" alt="">' +
			'</div>'+
			'<div class="card-body">' +
				'<div class="title" style="color: ' + onePartner.color + '">'+onePartner.name+'</div> <div class="ca">Chiffre d\'affaire :'+onePartner.ca+'</div><hr>'+
				'<p class="description">'+onePartner.description+'</p>'+
				'<p class="description">Sur : '+onePartner.zone+'.</p>'+
				'<p class="colabs">Nombre de collobaroteurs de MQL chez '+onePartner.name+' est :'+onePartner.nbr_colla+'</p>'+
				'<img src="' + onePartner.image + '" class="micro-logo" alt="">' +
				'<p class="website">Site web officiel : <a href="https://'+onePartner.website+'" target="_blank">'+onePartner.website+'</a></p>'+
			'</div></div>'
		;
};
PartnerComponent.prototype.addMenuPartners = function (onePartner) {
	this.partners.innerHTML +=
			'<div id="menu-' + onePartner.name + '" class="partner active" onclick=view.show("'+onePartner.name+'")>'+onePartner.name+'</div>';
};
// Printing all service data into the table member
PartnerComponent.prototype.printPartners = function () {
	this.currentblock =""+this.service.get(0).name;
	for (let i = 0; i < this.service.size(); i++) {
		this.addMenuPartners(this.service.get(i));
	}
	this.partners.innerHTML += '<img class="end-img" src="../../resources/pictures/Partners/menu-bottom.jpg">'
	for (let i = 0; i < this.service.size(); i++) {
		this.addOnePartner(this.service.get(i));
	}
};


PartnerComponent.prototype.show = function (id) {
    let hide_block= this.get(this.currentblock);
	this.get('menu-' + this.currentblock).classList.remove('active');
	let show_block = this.get(id);
	this.currentblock=id;
    hide_block.style['display'] = 'none';
    show_block.style['display'] = 'block';
    this.get('menu-' + id).classList.add('active');
};
PartnerComponent.prototype.show2 = function (id) {
	view.show(id);
	window.location.href='#'+id;
};
PartnerComponent.prototype.hideAll = function () {
	for (let i = 1; i < this.service.size(); i++) {
		let partner = document.getElementsByClassName('card')[i];
		partner.style['display'] = 'none';
		document.getElementsByClassName('partner')[i].classList.remove('active');
	}
};

PartnerComponent.prototype.trigger = function () {
	let anchor = window.location.href.split('#')[1];
	if(anchor !== undefined) {
		this.get('menu-' + anchor).click();
		window.location.href = '#' + anchor;
	}
};

PartnerComponent.prototype.ajustLinks = function () {
	let links = document.getElementsByClassName('img-partenaire');
	for(let link of links) {
		link.setAttribute('onclick', 'view.show2(\'' + link.id + '\')');
	}
};
/* Main Function */ 
function main() { 
	service = new PartnerComponentService(); 
	service.load(dbPartner);
	view = new PartnerComponent(service); 
	//view.printPartnerList(); Uncomment to print data in table member
	view.printPartners();
	view.hideAll();
	view.trigger();
	view.ajustLinks();
} 
