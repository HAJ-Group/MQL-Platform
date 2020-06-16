/*Global Variables*/ 
let view; 
let service;
let current_page_number = 1;
const MAX_PROMOTION_PER_PAGE = 13;
const DEFAULT_TOP_PROFILE_IMAGE = {M:'../../resources/pictures/top-profile.jpg', F:'../../resources/pictures/top-profile-female.jpg'};
const DEFAULT_PROFILE_IMAGE = {M:'../../resources/pictures/profile.png', F:'../../resources/pictures/profile-female.png'};
let k;
/*--------------------------------------------------------------------------------------------------------------------*/
/*Default class*/
function LaureateComponent(service) { 
	//TODO: Intitialize controller for LaureateComponent 
	current_component = 'Laureate'; 
	loadResources(); 
	this.service = service; 
	//this.table = this.get('table-LaureateID'); Uncomment for apply dynamic data loading to a declared html tag by id (Add other tables if needed with associated methods)
	this.page_blocks = split(this.service.db, MAX_PROMOTION_PER_PAGE);
	this.block_nav = $('#navigation');
	this.block_main = $('#main');
	this.block_switch = $('#switcher');
	this.block_recommendation = $('#list-recommendation');
	this.htmlSaver = {
		nav: this.block_nav.innerHTML,
		main: this.block_main.innerHTML,
		recommendation : this.block_recommendation.innerHTML,
		switcher: this.block_switch.innerHTML,
	};
}
/*--------------------------------------------------------------------------------------------------------------------*/
// Adding a row in the table member 
LaureateComponent.prototype.addLaureateRow = function (oneLaureate) { 
	let row = this.table.insertRow(); 
	//row.insertCell().innerHTML = news.id; 
	//TODO:INSERT DATA IN CELLS 
};
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Create navigation menu dynamically
 */
LaureateComponent.prototype.fillNavigation = function () {
	let htmlContent = this.block_nav;
	htmlContent.innerHTML = this.htmlSaver.nav;
	for(let promotion of this.page_blocks[current_page_number - 1]) {
		htmlContent.appendChild(buildHR());
		let divMenu = buildDIV(buildLINK('#' + promotion.id,promotion.name,cls('menuitem')));
		// htmlContent += '<hr>\n' +
		// 	'<div><a class="menuitem" href="#' + promotion.id + '">' + promotion.name + '</a></div>\n';
		htmlContent.appendChild(divMenu);
	}
};
/*--------------------------------------------------------------------------------------------------------------------*/
// Printing all service data into the table member
LaureateComponent.prototype.fillMain = function () {
    let htmlContent = this.block_main;
	htmlContent.innerHTML = this.htmlSaver.main;
	let img;
    for(let promotion of this.page_blocks[current_page_number - 1]) {
        let details = buildDIV(buildParagraph(promotion.date.getFullYear(),cls('date')),cls('details'));
        let promo = buildDIV([
			buildDIV(promotion.name,cls('title')),
            details
		],id(promotion.id));
        htmlContent.appendChild(promo);
		if(sessionStorage.getItem('ACCESS') !== null) {
			//details
            details.appendChild(
                buildDIV(
                    buildIMG("../../resources/pictures/icons/new-icon.png",'',cls('new-icon',[{name:'onclick',value:'view.addData("' + promotion.id + ',laureate")'}])),
                    cls(['new-block','new-laureate'])
                )
            );
		}
		for (let laureate of promotion.content) {
			if((laureate.photo === '')){
				img = DEFAULT_PROFILE_IMAGE[laureate.gender];
			} else img = laureate.photo;
			// EDIT AND DELETE
			if(sessionStorage.getItem('ACCESS') !== null) {
			//    console.log(promo)
			    details.appendChild(
			        buildDIV([
			            buildIMG("../../resources/pictures/icons/edit.png",'',wrapICN('','sh-icon','edit-icon',[{name:'onclick',value:'view.editData("' + promotion.id + ',' +  laureate.id + ',laureate")'}])),
                        buildIMG("../../resources/pictures/icons/delete.png",'',wrapICN('','sh-icon','delete-icon',[{name:'onclick',value:'view.deleteData("' + promotion.id + ',' +  laureate.id + 'laureate")'}]))
                    ],cls('laureate-icons'))
                );
			}
			// LIST ITEM
            let item = buildDIV([
                buildDIV([
                    buildDIV(laureate.name +' ('+laureate.job+')', cls('item-element',[{name:'onclick',value:'view.showInfos("' + promotion.id + '-' + laureate.id +'")'}])),
                    buildSPAN(null,cls('linkedin',[{name:'onclick',value:'window.location.href="'+ laureate.linked_in+'"'}]))
                ],cls('item-description')),
            ],wrapIC('item-'+promotion.id+'-'+laureate.id,'card-laureate'));
			details.appendChild(item);
			// INFO BODY

			let promoItem = buildDIV(null,wrapIC( promotion.id +'-'+ laureate.id,'card-laureate',[{name:'style',value:'display: none'}]));
			if(laureate.photo !== "") {
				promoItem.appendChild(
                        buildIMG(img,'',id('laureatePhoto-'+promotion.id+'-'+laureate.id,[{name:'onclick',value:'popIMG(this.id)'}]))
                );
			} else {
				promoItem.appendChild(
                        buildIMG(img,'',id('laureatePhoto-'+promotion.id+'-'+laureate.id))
                );
			}
			let infos = buildElement('ul',null);
			let cardDescription = buildDIV(infos,cls('card-desc'));
			let description = buildDIV([
			    buildDIV([
			        laureate.name ,
                    buildSPAN(null,cls('linkedin',[{name:'onclick',value:'"window.location.href='+ laureate.linked_in}])),
                ],cls('element',[{name:'onclick',value:'view.hideInfos("'+promotion.id+'-'+laureate.id+'")'}])),
				cardDescription
			],cls('description'));
			// ENTERPRISE && CITY
			if(laureate.current_enterprise !== '' && laureate.city !== '') {
			    infos.appendChild(
                    buildElement('li',[
                        'Enterprise :',buildSPAN(laureate.current_enterprise+','+laureate.city,cls('value'))
                    ])
                );
			}
			// STAGE
			if(laureate.stage !== '') {
			    infos.appendChild(
                    buildElement('li',[
                        'Stage : ',buildSPAN(laureate.stage,cls('value'))
                    ])
                );
			}
			// EXPERIENCES
			if(laureate.experience.length!==0) {
                infos.appendChild(
                    buildElement('li',[
                        'Expériences',buildSPAN(laureate.experience,cls('value'))
                    ])
                );
			}
			// Email :
			if(laureate.email !== '')
                infos.appendChild(
                    buildElement('li',[
                        'Email : ',buildSPAN(buildLINK('mailto:'+laureate.email,laureate.email),cls('value'))
                    ])
                );
			    infos.appendChild(buildHR());
			// DESCRIPTION
			if(laureate.rating !== ''){
                infos.appendChild(
                    buildDIV(null,'quotes')
                );
                infos.appendChild(
                    buildParagraph(laureate.rating,cls('rating'))
                );
			}
			promoItem.appendChild(description);
			details.appendChild(promoItem);
		}
	}
};
/*--------------------------------------------------------------------------------------------------------------------*/
LaureateComponent.prototype.fillRandomRecomendation =function(){
	let html_content='';
	let tmp =Math.floor(Math.random()*this.service.special.length);
	if(k==tmp){
		this.fillRandomRecomendation();
	}
	else{
	k=tmp;
	let laureate = this.service.special[k];
	let imageR=laureate.photo;
        if(laureate.photo === ''){
			 imageR = DEFAULT_TOP_PROFILE_IMAGE[laureate.gender];
		}
		else imageR = laureate.photo;
		let recommendation = buildDIV([
			buildDIV([
				buildDIV(buildIMG( imageR,'',id('reco-img-'+laureate.id)),cls('image-person')),
				buildDIV([
					buildDIV(laureate.name,cls('name')),
					buildDIV(laureate.job+' à '+laureate.current_enterprise,cls('society'))
				],cls('infos'))
			],cls('image-and-infos')),
			buildDIV([
				buildParagraph([
					buildElement('q',laureate.rating)
				])
			],cls('opinion'))
		],cls('recommendation'))

		this.block_recommendation.appendChild(recommendation);

	}
};
/*--------------------------------------------------------------------------------------------------------------------*/
LaureateComponent.prototype.random = function () {
	this.block_recommendation.innerHTML='';
	for (let i=0;i<2;i++){
		this.fillRandomRecomendation();
	}
};
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Create page switcher dynamically
 */
LaureateComponent.prototype.fillSwitcher = function () {
	let htmlContent = this.htmlSaver.switcher;
	let pages = this.page_blocks.length;
	for(let i = 1; i<=pages; i++) {
		if(current_page_number === i) htmlContent += '<span onclick="view.navigate(' + i + ', true)" class="active-page">' + i + '</span>';
		else htmlContent += '<span onclick="view.navigate(' + i + ', true)">' + i + '</span>';
	}
	this.block_switch.innerHTML = htmlContent;
};
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Navigate between pages
 * @param page_number
 * @param top
 */
LaureateComponent.prototype.navigate = function(page_number=1, top=false) {
	current_page_number = page_number;
	this.fillNavigation();
	this.fillMain();
	this.fillSwitcher();
	addTitleIcon('../../resources/pictures/laureate-logo.png', true);
	detect_subContent_trigger_left_bar();
	if(top) window.location.href = '#header';
};
/*--------------------------------------------------------------------------------------------------------------------*/
// Print PROMOTIONS :
LaureateComponent.prototype.printPromotionsCards = function () {
	for (let i = 0; i < this.service.size(); i++) {
		this.addLaureateRow(this.service.get(i));
	}
};
/*--------------------------------------------------------------------------------------------------------------------*/
// Collapse cards
LaureateComponent.prototype.showInfos = function(id) {
	let item = $('#item-' + id);
	item.style.display = 'none';
	let info = $('#' + id);
	if(window.innerWidth <= 700){
		info.style.display = 'block';
	}
	else info.style.display = 'flex';
};
/*--------------------------------------------------------------------------------------------------------------------*/
LaureateComponent.prototype.hideInfos = function (id) {
	let item = $('#item-' + id);
	if(window.innerWidth <= 700){
		item.style.display = 'block';
	}
	else item.style.display = 'flex';
	let info = $('#' + id);
	info.style.display = 'none';
};
/*--------------------------------------------------------------------------------------------------------------------*/
LaureateComponent.prototype.updateView = function () {
	//
};
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Filtering function works with search box
 */
LaureateComponent.prototype.filterKey = function () {
	let key = $('#key').value;
	let init_size = this.page_blocks.length;
	if(key === '') {
		// LOAD ALL DATA
		this.page_blocks = split(this.service.db, MAX_PROMOTION_PER_PAGE);
	} else {
		// LOAD BY KEY
		this.page_blocks = split(this.service.searchByKey(key), MAX_PROMOTION_PER_PAGE);
	}
	if(this.page_blocks.length === 0) {
		$('.error-message')[0].innerHTML = 'Laureate not Found !';
		$('#key').setAttribute('class', 'search-error');
		showEmptyErrorResult();
	}
	else {
		$('.error-message')[0].innerHTML = '';
		$('#key').setAttribute('class', 'search-input');
	}
	this.navigate();
};
/*--------------------------------------------------------------------------------------------------------------------*/
/* FORM SERVICES */
LaureateComponent.prototype.addData = function(target_el = 'promotion') {
	if(target_el === 'promotion') {
		$('#promotionSubmit').setAttribute('onclick', 'view.submitData()');
		popFORM(target_el);
	} else {
		console.log('target added laureate index = ' + target_el);
		let value = target_el.split(',');
		$('#' + value[1] + 'Submit').setAttribute('onclick', 'view.submitData(\'add\', \'' + value[0] + '\', \'' + value[1] + '\')');
		popFORM(value[1]);
	}
};
/*--------------------------------------------------------------------------------------------------------------------*/
LaureateComponent.prototype.editData = function(index, target_el = 'promotion') {
	let el_name = $('#' + target_el + 'Name');
	//....
	let target;
	if(target_el === 'promotion') {
		target = this.service.get(index);
		el_name.value = target.name;
	}
	else {
		// LAUREATE
		let el_gender = $('#' + target_el + 'Gender');
		let el_email = $('#' + target_el + 'Email');
		let el_job = $('#' + target_el + 'Job');
		let el_stage = $('#' + target_el + 'Stage');
		let el_ce = $('#' + target_el + 'CE');
		let el_exp = $('#' + target_el + 'Exp');
		let el_rating = $('#' + target_el + 'Rating');
		//...
		let keys = index.split(',');
		target = this.service.getLaureate(keys[0], parseInt(keys[1]));
		el_name.value = target.name;
		el_gender.value = target.gender;
		el_email.value = target.email;
		el_job.value = target.job;
		el_job.city = target.city;
		el_stage.value = target.stage;
		el_ce.value = target.current_enterprise;
		try {
			el_exp.value = target.experience.join(',');
		} catch (e) {}
		el_rating.value = target.rating;
	}
	//...
	$('#' + target_el + 'Submit').setAttribute('onclick', 'view.submitData(\'edit\', \'' + index + '\', \'' + target_el + '\')');
	popFORM(target_el);
};
/*--------------------------------------------------------------------------------------------------------------------*/
LaureateComponent.prototype.deleteData = function(index, target_el = 'promotion') {
	if(target_el === 'promotion') {
		if(confirm('Are you sure you want to delete this Promotion ?')) {
			this.service.remove(index);
			//....
		}
	} else {
		// LAUREATES
		if(confirm('Are you sure you want to delete this Laureate ?')) {
			let keys = index.split(',');
			this.service.removeLaureate(keys[0], parseInt(keys[1]));
			//....
		}
	}
	try {
		this.page_blocks = split(this.service.db, MAX_PROMOTION_PER_PAGE);
		this.navigate();
	} catch (e) {
		if(confirm('None Promotion is found! Add new one ?')) {
			this.addData();
		} else {
			route('../Home');
		}
	}
};
/*--------------------------------------------------------------------------------------------------------------------*/
LaureateComponent.prototype.submitData = function (action = 'add', index = '0', target_el = 'promotion') {
	// PROMOTION
	if(target_el === 'promotion') {
		// GETTING DATA MEMBERS
		let name = $('#promotionName').value;
		//..
		if (action === 'add') {
			if(this.service.isUpToDate('p' + (new Date()).getFullYear())){
				alert((new Date()).getFullYear() + ' Promotion is already exists can\'t add new promotion before next year !');
			} else {
				this.service.add(new Promotion('p' + (new Date()).getFullYear(),name,new Date()));
			}
		}
		if(action === 'edit') {
			let target = this.service.get(index);
			target.name = name;
			//...
		}
	}
	// LAUREATE
	else {
		// GETTING DATA MEMBERS
		let name = $('#' + target_el + 'Name').value;
		let gender = $('#' + target_el + 'Gender').value;
		let email = $('#' + target_el + 'Email').value;
		let job = $('#' + target_el + 'Job').value;
		let city = $('#' + target_el + 'City').value;
		let ce = $('#' + target_el + 'CE').value;
		let exp;
		try {
			exp = $('#' + target_el + 'Exp').value.split(',');
		} catch (e) {}
		let stage = $('#' + target_el + 'Stage').value;
		let rating = $('#' + target_el + 'Rating').value;
		//..
		if(action === 'add') {
			this.service.addLaureate(index, new Laureate(this.service.sizeLaureates(index) + 1, name, gender, job, city, email, ce, exp, '', rating, ''));
			this.service.sortLaureates(index);
		}
		if(action === 'edit') {
			let keys = index.split(',');
			console.log(keys);
			let target = this.service.getLaureate(keys[0], parseInt(keys[1]));
			target.name = name;
			target.gender = gender;
			target.email = email;
			target.job = job;
			target.city = city;
			target.current_enterprise = ce;
			try {
				target.experience = exp.join(',');
			} catch (e) {}
			target.stage = stage;
			target.rating = rating;
			//..
		}
	}
	this.service.sort();
	this.page_blocks = split(this.service.db, MAX_PROMOTION_PER_PAGE);
	closeFORM(target_el);
	this.navigate();
};
/*--------------------------------------------------------------------------------------------------------------------*/
LaureateComponent.prototype.triggerSubmit = function () {
	let submit_element = $('#promotionSubmit');
	submit_element.click();
};
/**-------------------------------------------------------------------------------------------------------------------*/
/* Main Function */
function main() { 
	service = new LaureateComponentService(); 
	service.loadPromotion(dbPromotion);
	service.loadspecial(dbPromotion);
	view = new LaureateComponent(service);
    try {
		view.fillNavigation();
		view.fillMain();
		view.random();
		view.fillSwitcher();
	} catch (e) {
		if(confirm('None Promotion is found! Add new one ?')) {
			view.addData();
		} else {
			route('../Home');
		}
	}
	// stays last
	addTitleIcon('../../resources/pictures/laureate-logo.png', true);
	detect_subContent_trigger_left_bar();
	setKeysAction('.form-content',view.triggerSubmit.bind(view));
}
/*--------------------------------------------------------------------------------------------------------------------*/
