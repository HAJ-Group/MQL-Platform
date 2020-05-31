/*Global Variables*/ 
let view; 
let service;
const DEFAULT_PARTNER_BG = '../../resources/pictures/Partners/new-bg.jpg';
/*Default class*/
function PartnerComponent(service) { 
	//TODO: Intitialize controller for PartnerComponent 
	current_component = 'Partner'; 
	loadResources(); 
	this.service = service; 
	//this.table = $('#table-PartnerID'); Uncomment for apply dynamic data loading to a declared html tag by id (Add other tables if needed with associated methods)
	this.currentblock = this.service.get(0).name;
	this.block_menu = $('#partnersMenu');
	this.block_container = $('#partnersContainer');
	this.htmlSaver = {
		menu: this.block_menu.innerHTML,
		container: this.block_container.innerHTML
	};
}

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

/*PartnerComponent.prototype.addOnePartner = function (onePartner) {
	this.block_container.innerHTML +=
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
};*/
/*PartnerComponent.prototype.addMenuPartners = function (onePartner) {
	this.block_menu.innerHTML +=
			'<div id="menu-' + onePartner.name + '" class="partner active" onclick=view.show("'+onePartner.name+'")>'+onePartner.name+'</div>';
};*/
// Printing all service data into the table member
/*PartnerComponent.prototype.printPartners = function () {
	this.currentblock =""+this.service.get(0).name;
	for (let i = 0; i < this.service.size(); i++) {
		this.addMenuPartners(this.service.get(i));
	}
	this.block_menu.innerHTML += '<img class="end-img" src="../../resources/pictures/Partners/menu-bottom.jpg">'
	for (let i = 0; i < this.service.size(); i++) {
		this.addOnePartner(this.service.get(i));
	}
};*/



PartnerComponent.prototype.fillPartnersMenu = function() {
	let htmlContent = this.htmlSaver.menu;
	for(let partner of this.service.db) {
		htmlContent += '<div id="menu-' + partner.name + '" class="partner active" ' +
			'onclick=view.show("'+partner.name+'")>'+partner.name+'</div>';
	}
	// ADD NEW BLOCK
	if(localStorage.getItem('ACCESS') !== 'null') {
		htmlContent += '<div class="new-block"><img onclick="view.addData()" src="../../resources/pictures/icons/new-icon.png" alt="" class="new-icon"></div>';
	}
	htmlContent += '<img class="end-img" src="../../resources/pictures/Partners/menu-bottom.jpg">';
	this.block_menu.innerHTML = htmlContent;
};

PartnerComponent.prototype.fillPartners = function() {
	let htmlContent = this.htmlSaver.container;
	let i = 0;
	for(let partner of this.service.db) {
		htmlContent += '<div class="card" id="'+partner.name+'">' +
			'<div class="card-image">' +
			'<img src="'+partner.bg+'" alt="">' +
			'</div>';
		if(localStorage.getItem('ACCESS') !== 'null') {
			htmlContent += '<div class="partner-icons"><img name="edit-icon" src="../../resources/pictures/icons/edit.png" alt=""  ' +
				'class="sh-icon" onclick="view.editData(' + i + ')">' +
				'<img name="delete-icon" src="../../resources/pictures/icons/delete.png" alt=""  ' +
				'class="sh-icon" onclick="view.deleteData(' + i + ')"></div>';
		}
		htmlContent +='<div class="card-body">' +
			'<div class="title" style="color: ' + partner.color + '">'+partner.name+'</div>' +
			'<div class="ca">Chiffre d\'affaire :'+partner.ca+'</div><hr>'+
			'<p class="description">'+partner.description+'</p>'+
			'<p class="description">Sur : '+partner.zone+'.</p>'+
			'<p class="colabs">Nombre de collobaroteurs de MQL chez '+partner.name+' est :'+partner.nbr_colla+'</p>'+
			'<img src="' + partner.image + '" class="micro-logo" alt="">' +
			'<p class="website">Site web officiel : <a href="https://'+partner.website+'" target="_blank">'+partner.website+'</a></p>'+
			'</div></div>';
		i++;
	}
	this.block_container.innerHTML = htmlContent;
};


// SHOW AND HIDE METHODS
PartnerComponent.prototype.show = function (id, top = false) {
	// block to hide is the current block
    let hide_block = $('#' + this.currentblock);
	$('#menu-' + this.currentblock).classList.remove('active');
	// block to show is the clicked block
	let show_block = $('#' + id);
	this.currentblock = id;
    hide_block.style['display'] = 'none';
    show_block.style['display'] = 'block';
    $('#menu-' + id).classList.add('active');
    if(top) location.href = '#' + id;
};

PartnerComponent.prototype.hideAll = function () {
	for (let i = 0; i < this.service.size(); i++) {
		let partner = $('.card')[i];
		partner.style['display'] = 'none';
		$('.partner')[i].classList.remove('active');
	}
	this.show(this.currentblock);
};

// LINKING FROM FOOTER METHODS
PartnerComponent.prototype.ajustLinks = function () {
	let links = $('.img-partenaire');
	for(let link of links) {
		link.setAttribute('onclick', 'view.show(\'' + link.id + '\', true)');
	}
};

PartnerComponent.prototype.trigger = function () {
	let anchor = window.location.href.split('#')[1];
	if(anchor !== undefined) {
		$('#menu-' + anchor).click();
	}
};


/*--------------------------------------------------------------------------------------------------------------------*/
/* FORM SERVICES */
PartnerComponent.prototype.addData = function() {
	$('#partnerSubmit').setAttribute('onclick', 'view.submitData()');
	popFORM();
};

PartnerComponent.prototype.editData = function(index) {
	let el_name = $('#partnerName');
	let el_color = $('#partnerColor');
	let el_ca=$('#partnerCa');
	let el_desc = $('#partnerDescription');
	let el_co=$('#partnerCo');
	let el_website=$('#partnerWebSite');
	//....
	let target = this.service.get(index);
	el_name.value = target.name;
	el_color.value= target.color;
	el_ca.value= target.ca;
	el_desc.value = target.description;
	el_co.value = target.nbr_colla;
	el_website.value = target.website;
	//...
	$('#partnerSubmit').setAttribute('onclick', 'view.submitData(\'edit\', ' + index + ')');
	popFORM();
};

PartnerComponent.prototype.deleteData = function(index) {
	if(confirm('Are you sure you want to delete this Partner ?')) {
		this.service.remove(index);
		//....
		try {
			this.currentblock = this.service.get(0).name;
			this.navigate();
		} catch (e) {
			if(confirm('None Partner is found! Add new one ?')) {
				view.addData();
			} else {
				route('../Home');
			}
		}

	}
};

PartnerComponent.prototype.submitData = function (action = 'add', index = '0') {
	// GETTING DATA MEMBERS
	let name = $('#partnerName').value;
	let color = $('#partnerColor').value;
	let ca=$('#partnerCa').value;
	let desc = $('#partnerDescription').value;
	let co=$('#partnerCo').value;
	let website=$('#partnerWebSite').value;
	//...
	if(action === 'add') {
		this.service.add(new Partner(this.service.size() + 1, DEFAULT_PARTNER_BG,name,color,ca,desc,co,'',website));
	}
	if(action === 'edit') {
		let target = this.service.get(index);
		target.name = name;
		target.color = color;
		target.ca = ca;
		target.description = desc;
		target.nbr_colla = co;
		target.website = website;
		//...
		$('#partnerSubmit').setAttribute('onclick', 'view.submitData()');
	}
	closeFORM();
	this.currentblock = name;
	this.navigate();
};

PartnerComponent.prototype.triggerSubmit = function () {
	let submit_element = $('#partnerSubmit');
	submit_element.click();
};

PartnerComponent.prototype.navigate = function() {
	view.fillPartnersMenu();
	view.fillPartners();
	view.hideAll();
};
/**-------------------------------------------------------------------------------------------------------------------*/
/* Main Function */ 
function main() {
	service = new PartnerComponentService(); 
	service.load(dbPartner);
	view = new PartnerComponent(service);
	try {
		view.fillPartnersMenu();
		view.fillPartners();
		view.hideAll();
		view.trigger();
		view.ajustLinks();
	} catch (e) {
		if(confirm('None Partner is found! Add new one ?')) {
			view.addData();
		} else {
			route('../Home');
		}
	}
	// Stays Last
	setKeysAction('.form-content',view.triggerSubmit.bind(view));
}
