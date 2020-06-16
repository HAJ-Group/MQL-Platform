/*Global Variables*/ 
let view; 
let service;
const DEFAULT_PARTNER_BG = '../../resources/pictures/Partners/new-bg.jpg';
/*Default class*/
/*--------------------------------------------------------------------------------------------------------------------*/
function PartnerComponent(service) { 
	//TODO: Intitialize controller for PartnerComponent 
	current_component = 'Partner'; 
	loadResources(); 
	this.service = service; 
	//this.table = $('#table-PartnerID'); Uncomment for apply dynamic data loading to a declared html tag by id (Add other tables if needed with associated methods)
	this.currentblock = this.service.get(0).id;
	this.block_menu = $('#partnersMenu');
	this.block_container = $('#partnersContainer');

	this.htmlSaver = {
		menu: this.block_menu.innerHTML,
		container: this.block_container.innerHTML
	};
}
/*--------------------------------------------------------------------------------------------------------------------*/
// Adding a row in the table member 
PartnerComponent.prototype.addPartnerRow = function (onePartner) { 
	let row = this.table.insertRow(); 
	//row.insertCell().innerHTML = news.id; 
	//TODO:INSERT DATA IN CELLS 
};
/*--------------------------------------------------------------------------------------------------------------------*/
// Printing all service data into the table member 
PartnerComponent.prototype.printPartnerList = function () { 
	for (let i = 0; i < this.service.size(); i++) { 
		this.addPartnerRow(this.service.get(i)); 
	} 
};
/*--------------------------------------------------------------------------------------------------------------------*/
PartnerComponent.prototype.fillPartnersMenu = function() {
	let htmlContent = this.block_menu;
	htmlContent.innerHTML = this.htmlSaver.menu;
	for(let partner of this.service.db) {
		let divMenu = buildDIV(partner.name,wrapIC('menu-'+partner.id,
			['partner','active'],[{name:'onclick',value:'view.show('+partner.id+")"}]));
		htmlContent.appendChild(divMenu);
	}
	// ADD NEW BLOCK
	if(sessionStorage.getItem('ACCESS') !== null) {
		let newBlock = buildDIV(
				buildIMG('../../resources/pictures/icons/new-icon.png','',wrapC(['new-icon'],[{name:'onclick',value:'view.addData()'}])),
			wrapC('new-block')
		);
		htmlContent.appendChild(newBlock);
	}
	let endImg = buildIMG("../../resources/pictures/Partners/menu-bottom2.jpg",'',wrapC('end-img'));
	htmlContent.appendChild(endImg);
};
/*--------------------------------------------------------------------------------------------------------------------*/
PartnerComponent.prototype.fillPartners = function() {
    let htmlContent = this.block_container;
    htmlContent.innerHTML = this.htmlSaver.container;
	let i = 0;
	for(let partner of this.service.db) {
		let card = buildDIV(buildDIV(buildIMG(partner.bg),wrapC('card-image')),wrapIC(partner.id,'card'));
		htmlContent.appendChild(card);
		if(sessionStorage.getItem('ACCESS') !== null) {
			let partnernsIcons = buildDIV([
				buildIMG('../../resources/pictures/icons/edit.png','',wrapICN('','sh-icon','edit-icon',[{name:'onclick',value:'view.editData(' + i + ')'}])),
				buildIMG('../../resources/pictures/icons/delete.png','',wrapICN('','sh-icon','delete-icon',[{name:'onclick',value:'view.deleteData(' + i + ')'}]))
				]
				,wrapC('partner-icons'));
			card.appendChild(partnernsIcons);
		}
		let bodyCard = buildDIV([
				buildDIV(partner.name,wrapC('title',[{name : 'style' , value : 'color:' + partner.color}])),
				buildDIV('Chiffre d\'affaire :'+partner.ca,wrapC('ca')),
				buildHR(),
				buildParagraph(partner.description,wrapC('description')),
				buildParagraph('Sur : '+partner.zone,wrapC('desciption')),
				buildParagraph('Nombre de collobaroteurs de MQL chez '+partner.name+' est :'+partner.nbr_colla,wrapC('colabs')),
				buildIMG(partner.image,'',wrapC('micro-logo')),
				buildParagraph(['Site web officiel : ',buildLINK('https://'+partner.website,partner.website,[{name:'target',value:'_blank'}])],wrapC('website'))
			]
			,wrapC('card-body'));
		card.appendChild(bodyCard);
		i++;
	}
};
/*--------------------------------------------------------------------------------------------------------------------*/
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
/*--------------------------------------------------------------------------------------------------------------------*/
PartnerComponent.prototype.hideAll = function () {
	for (let i = 0; i < this.service.size(); i++) {
		let partner = $('.card')[i];
		partner.style['display'] = 'none';
		$('.partner')[i].classList.remove('active');
	}
	this.show(this.currentblock);
};
/*--------------------------------------------------------------------------------------------------------------------*/
// LINKING FROM FOOTER METHODS
PartnerComponent.prototype.ajustLinks = function () {
	let links = $('.img-partenaire');
	for(let link of links) {
		link.setAttribute('onclick', 'view.show(' + link.id.split('-')[1]+ ', true)');
	}
};
/*--------------------------------------------------------------------------------------------------------------------*/
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
/*--------------------------------------------------------------------------------------------------------------------*/
PartnerComponent.prototype.editData = function(index) {
	let el_id = $('#partnerID');
	let el_name = $('#partnerName');
	let el_color = $('#partnerColor');
	let el_ca=$('#partnerCa');
	let el_desc = $('#partnerDescription');
	let el_co=$('#partnerCo');
	let el_website=$('#partnerWebSite');
	//....
	let target = this.service.get(index);
	el_id.value = target.id;
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
/*--------------------------------------------------------------------------------------------------------------------*/
PartnerComponent.prototype.deleteData = function(index) {
	if(confirm('Are you sure you want to delete this Partner ?')) {
		this.service.remove(index);
		//....
		try {
			this.currentblock = this.service.get(0).id;
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
/*--------------------------------------------------------------------------------------------------------------------*/
PartnerComponent.prototype.submitData = function (action = 'add', index = '0') {
	// GETTING DATA MEMBERS
	let id = $('#partnerID').value
	let name = $('#partnerName').value;
	let color = $('#partnerColor').value;
	let ca=$('#partnerCa').value;
	let desc = $('#partnerDescription').value;
	let co=$('#partnerCo').value;
	let website=$('#partnerWebSite').value;
	//...
	if(action === 'add') {
		this.service.add(new Partner(this.service.size() + 1, DEFAULT_PARTNER_BG,name,color,ca,desc,co,'',website));
		id=this.service.size();
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
	this.currentblock = id;
	this.navigate();
};
/*--------------------------------------------------------------------------------------------------------------------*/
PartnerComponent.prototype.triggerSubmit = function () {
	let submit_element = $('#partnerSubmit');
	submit_element.click();
};
/*--------------------------------------------------------------------------------------------------------------------*/
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
/*--------------------------------------------------------------------------------------------------------------------*/
