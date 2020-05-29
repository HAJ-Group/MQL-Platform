/*Global Variables*/
let view;
let service;
/*Default class*/
function ActivityComponent(service) {
	//TODO: Intitialize controller for ActivityComponent
	current_component = 'Activity';
	loadResources();
	this.service = service;
	//this.table = this.get('table-ActivityID'); Uncomment for apply dynamic data loading to a declared html tag by id (Add other tables if needed with associated methods)
}
ActivityComponent.prototype.get = function (id) {
	return document.getElementById(id);
};

/*
// Adding a row in the table member
ActivityComponent.prototype.addActivityRow = function (oneActivity) { 
	let row = this.table.insertRow(); 
	//row.insertCell().innerHTML = news.id; 
	//TODO:INSERT DATA IN CELLS 
}; 
// Printing all service data into the table member 
ActivityComponent.prototype.printActivityList = function () { 
	for (let i = 0; i < this.service.size(); i++) { 
		this.addActivityRow(this.service.get(i)); 
	} 
};

*/

ActivityComponent.prototype.printSemesters = function(){
	let subjectZone = this.get('zone');
	for (let i = 0; i < this.service.size(); i++) {
		let semesterI = this.service.get(i);

		let semesterName = '';
		switch (i + 1) {
			case 1: semesterName = 'Le premier semestre'; break;
			case 2: semesterName = 'Le deuxième semestre'; break;
			case 3: semesterName = 'Le troisième semestre'; break;
			case 4: semesterName = 'Le quatrième semestre (Stage pré-embauche)'; break;
		}

		let modules = '<ul>';
		let moduleImage = '';
		for (let j = 0; j < semesterI.modules.length; j++) {
			moduleImage = semesterI.modules[0];
			if (j === 0) continue;
			modules += '<li>' + 'M' + (j) + '(' + semesterI.modules[j] + ')</li>';
		}
		modules += '</ul>';

		let activities = '';
		let activityImage = '';
		for (let j = 0; j < semesterI.activity.length; j++) {
			activityImage = semesterI.activity[0];
			if(j === 0) continue;
			activities += '<p><span></span>' + semesterI.activity[j] + '</p>';
		}

		let cards = '';

		for (let j = 1; j <= 3; j++) {
			if (j === 1){

				cards += '<div class="semester-description">'

							+ '<p>' + semesterI.description[1] + '</p>' +

					     '</div>' +
					'';
			}

			if (j === 2){
                if (i === 3)
                    cards += '';
                else
				cards += '<div class="card">' +
					'<img class="card-image" src="' + moduleImage + '" alt="">' +
						'<div class="card-text">' +
							'<div class="card-subject"> ' + 'Modules' +' </div>' +
							'<div class="subject"> ' + modules + ' </div>' +
						'</div>' +
						'<div class="card-footer">' +
							'' +
								'<img class="logo-mql" src="../../resources/pictures/logo-mql2.png" alt="">' +
							'' +
						'</div>' +
					'</div>';
			}
			if (j === 3){

				cards += '<div class="card" id="card">' +
					'<img class="card-image" src="' + activityImage + '" alt="">' +
						'<div class="card-text">' +
							'<div class="card-subject"> ' + 'Objectifs' +' </div>' +
							'<div class="subject"> ' + activities + ' </div>' +
						'</div>' +
						'<div class="card-footer">' +
							'' +
								'<img class="logo-mql" src="../../resources/pictures/logo-mql2.png" alt="">' +
							'' +
						'</div>' +
					'</div>';
			}
		}



		subjectZone.innerHTML +=
			'<div class="big-container">' +
				'<div id="collapse-' + (i + 1) + '" class="title-top-cards collapsible">' + semesterName +
					'' +
				'</div>' +
				'<div class="cards-container content-card">' +
					' ' + cards + ' ' +
				'</div>' +
			' </div>';
	}
};


ActivityComponent.prototype.updateView = function () {
	if(window.innerWidth > 700){
		window.location.reload();
	}
};

/*
ActivityComponent.prototype.printSubjects = function () {
	let subjectZone = this.get('zone');
	for (let i = 0; i < this.service.size(); i++) {
		let subjectElement = this.service.get(i);
		let cards = '';

		for (let j = 0; j < subjectElement.subject[0].data.length; j++) {
			cards += '<div class="card">' +
						'<img class="card-image" src="' + subjectElement.subject[0].data[j][2] + '" alt="">' +
						'<div class="card-text">' +
							'<div class="card-subject"> ' + subjectElement.subject[0].data[j][0] +' </div>' +
							'<div class="subject"> ' + subjectElement.subject[0].data[j][1] + ' </div>' +
						'</div>' +
						'<div class="card-footer">' +
							'<a href="#">' +
								'<img class="logo-mql" src="../../resources/pictures/logo-mql2.png" alt="">' +
							'</a>' +
						'</div>' +
					'</div>';
		}

		subjectZone.innerHTML +=
			'<div class="big-container">' +
				'<div class="title-top-cards collapsible">' + subjectElement.subject[0].name +
				'' +
				'</div>' +
				'<div class="cards-container content-card">' +
					' ' + cards + ' ' +
				'</div>' +
			' </div>';
	}

};
*/


function collapse(){
	let coll = document.getElementsByClassName("collapsible");
	let i;


	for (i = 0; i < coll.length; i++) {
		coll[i].addEventListener("click", function() {
			this.classList.toggle("active-element");
			let content = this.nextElementSibling;

			if (content.style.maxHeight){
				content.style.maxHeight = null;
			} else {
				content.style.maxHeight = content.scrollHeight + "px";
			}
		});
	}
}

function main() {
	service = new ActivityComponentService();
	service.load(dbActivity);
	view = new ActivityComponent(service);
	view.printSemesters();
	collapse();
	addTitleIcon('../../resources/pictures/Activity-logo.png');
	//view.printActivityList(); Uncomment to print data in table member
}
