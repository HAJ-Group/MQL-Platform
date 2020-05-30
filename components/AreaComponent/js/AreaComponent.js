/*Global Variables*/ 
let view; 
let service;
/*Default class*/ 
function AreaComponent(service) { 
	//TODO: Intitialize controller for AreaComponent 
	current_component = 'Area'; 
	loadResources(); 
	this.service = service; 
	//this.table = this.get('table-AreaID'); Uncomment for apply dynamic data loading to a declared html tag by id (Add other tables if needed with associated methods) 
} 

// Adding a row in the table member 
AreaComponent.prototype.addAreaRow = function (oneArea) { 
	let row = this.table.insertRow(); 
	//row.insertCell().innerHTML = news.id; 
	//TODO:INSERT DATA IN CELLS 
}; 
// Printing all service data into the table member 
AreaComponent.prototype.printAreaList = function () { 
	for (let i = 0; i < this.service.size(); i++) { 
		this.addAreaRow(this.service.get(i));
	}
};

AreaComponent.prototype.promptLogin = function () {
	$('#restricted').style.display = 'none';
	let window = $('#login-window');
	window.style.display = 'block';
};

AreaComponent.prototype.authenticate = function() {
	let username = $('#username').value;
	let password = $('#password').value;
	if(this.service.isExist(username, password)) {
		// GRANT ACCESS (WORKING ONLY WHEN DATA IS EXTERNAL)
		localStorage.setItem('ACCESS', username);
		this.loadData();
	} else {
		$('#errorMess').innerHTML = 'Username or Password not valid';
		$('#errorBlock').style.display = 'block';
	}
};
AreaComponent.prototype.logout = function() {
	// DENY ACCESS
	localStorage.setItem('ACCESS', null);
	route('../Home');
};

AreaComponent.prototype.loadData = function() {
	// REMOVE RESTRICTIONS
	$('#errorBlock').style.display = 'none';
	$('#login-window').style.display = 'none';
	$('#user').innerHTML = localStorage.getItem('ACCESS');
	$('#phone-user').innerHTML = localStorage.getItem('ACCESS');
	$('#restricted').style.display = 'block';
};

AreaComponent.prototype.cancel = function () {
	route('../Home');
};
/**-------------------------------------------------------------------------------------------------------------------*/
/* Main Function */ 
function main() { 
	service = new AreaComponentService(); 
	service.load(dbArea);
	view = new AreaComponent(service); 
	//view.printAreaList(); Uncomment to print data in table member
	if(localStorage.getItem('ACCESS') !== 'null'){
		view.loadData();
	} else view.promptLogin();
	setKeysAction('.access-content',view.authenticate.bind(view));
}
