
/*Default class*/ 
function AreaComponent(service) { 
	//TODO: Intitialize controller for AreaComponent 
	current_component = 'Area'; 
	loadResources(); 
	this.service = service; 
	//this.table = this.get('table-AreaID'); Uncomment for apply dynamic data loading to a declared html tag by id (Add other tables if needed with associated methods) 
} 
AreaComponent.prototype.$ = function (id) {
	if(id.startsWith('.')) return document.getElementsByClassName(id.substring(1));
	return document.getElementById(id);
};
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
	this.$('restricted').style['display'] = 'none';
	let window = this.$('login-window');
	window.style['display'] = 'block';
};

AreaComponent.prototype.authenticate = function() {
	let username = this.$('username').value;
	let password = this.$('password').value;
	if(this.service.isExist(username, password)) {
		// GRANT ACCESS (WORKING ONLY WHEN DATA IS EXTERNAL)
		localStorage.setItem('ACCESS', username);
		this.loadData();
	} else {
		this.$('errorMess').innerHTML = 'Username or Password not valid';
		this.$('errorBlock').style['display'] = 'block';
	}
};

AreaComponent.prototype.logout = function() {
	// DENY ACCESS
	localStorage.setItem('ACCESS', null);
	window.location.reload();
};

AreaComponent.prototype.loadData = function() {
	// REMOVE RESTRICTIONS
	this.$('errorBlock').style['display'] = 'none';
	this.$('login-window').style['display'] = 'none';
	this.$('user').innerHTML = localStorage.getItem('ACCESS');
	this.$('phone-user').innerHTML = localStorage.getItem('ACCESS');
	this.$('restricted').style['display']= 'block';
};

AreaComponent.prototype.cancel = function () {
	route('../Home');
};


