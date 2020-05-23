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
	/*  Creating a card :
	* 1- Card body :
	* */
	// Create title div element
	let title = document.createElement('div');
	title.setAttribute('class','title');
	let titleValue=document.createTextNode(onePartner.name);
	title.appendChild(titleValue);
	// Create chiffre d'affaires element :
	let ca = document.createElement('div');
	ca.setAttribute('class','ca');
	let caValue=document.createTextNode(onePartner.ca);
	ca.appendChild(caValue);
	// Create description Element :
	let desc = document.createElement('p');
	desc.setAttribute('class','description');
	let descValue=document.createTextNode(onePartner.description);
	desc.appendChild(descValue);
	// Create description collabs :
	let colabs = document.createElement('p');
	colabs.setAttribute('class','colabs');
	let colabsValue=document.createTextNode('Nombre de collaborateurs de MQL chez CGI est : '+onePartner.nbr_colla);
	colabs.appendChild(colabsValue);
	// Create website collabs :
	let webSite = document.createElement('p');
	webSite.setAttribute('class','website');
	let phraseWebSite=document.createTextNode('Site web officiel : ');
	webSite.appendChild(phraseWebSite);
	let webSiteValue=document.createElement('a');
	webSiteValue.setAttribute('href','https://'+onePartner.website);
	webSiteValue.setAttribute('target','_blank');
	let webSiteText=document.createTextNode(onePartner.website);
	webSiteValue.appendChild(webSiteText);
	webSite.appendChild(webSiteValue);

	// Add to card-body tag:
	let cardBody=document.createElement('div');
	cardBody.setAttribute('class','card-body');
    let cardBodyElements = [title,ca,desc,colabs,webSite];
    for (let i=0;i<cardBodyElements.length;i++){
		cardBody.appendChild(cardBodyElements[i]);
	}
	/*
	* 2-Card Image
	* */
	// Create the image element :
	let image = document.createElement('img');
	image.setAttribute('src',onePartner.image);
	// Create the card image div :
	let cardImage = document.createElement('div');
	cardImage.setAttribute('class','card-image');

	// add the image to card-Image
	cardImage.appendChild(image);
	/*
	* 3- Create the tag
	* */
	let card = document.createElement('div');
	card.setAttribute('class','card');
	card.setAttribute('id',onePartner.name);
   // Append all :
	card.appendChild(cardImage);
	card.appendChild(cardBody);
	/*
	* 4- HTML
	* */
	this.block.appendChild(card);
	/*
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
		*/
};
PartnerComponent.prototype.addMenuPartners = function (onePartner) {
	let partner = document.createElement('div');
	partner.setAttribute('class','partner');
	partner.setAttribute('id','P'+onePartner.name);
	partner.addEventListener("click",function () {
		 view.show(onePartner.name)
	});
	let partnerName=document.createTextNode(onePartner.name);
	partner.appendChild(partnerName);
	this.partners.appendChild(partner);
	/*
	this.partners.innerHTML +=
			'<div class="partner" id="P'+onePartner.name+'"onclick=view.show("'+onePartner.name+'")>'+onePartner.name+'</div>';
	*/
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
	view.hidden();
};


PartnerComponent.prototype.show = function (id) {
    let hiddenblock=this.get(this.currentblock);
	let showblock = this.get(id);
	let partner=this.get("P"+id);
	this.currentblock=id;
    hiddenblock.style["display"] = 'none';
    showblock.style["display"]= 'block';
    showblock.style['animation'] = '0.5s ease-in 0s 1 slideInFromRight';
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

} 
