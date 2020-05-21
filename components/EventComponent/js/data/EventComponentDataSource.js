/* Global data source table for EventComponent */
/**
 * You can use these types : card, image-show, image-grid,
 * @type {*[]}
 */

let dbEventBook1 = [
	'../../resources/pictures/Events/CAP.JPG',
	'../../resources/pictures/Events/cap1.JPG',
	'../../resources/pictures/Events/cap2.JPG',
	'../../resources/pictures/Events/CGI.JPG',
	'../../resources/pictures/Events/CGI2.JPG',
	'../../resources/pictures/Events/CGI1.JPG',
	'../../resources/pictures/Events/CGI3.JPG',
	'../../resources/pictures/Events/UMANIS2.JPG',
	'../../resources/pictures/Events/UMANIS4.JPG',
	'../../resources/pictures/Events/CGI.JPG',
	'../../resources/pictures/Events/CGI3.JPG',
];

let dbEventBook2 = [
	'../../resources/pictures/Events/JE1.JPG',
	'../../resources/pictures/Events/JE2.JPG',
	'../../resources/pictures/Events/JE3.JPG',
	'../../resources/pictures/Events/JE4.JPG',
	'../../resources/pictures/Events/JE5.JPG',
	'../../resources/pictures/Events/JE6.JPG',
];

let dbEvent = [
	{
		id: 1,
		title:'Compagnes de stages : A partir d\'octobre',
		description:'Un Mqliste, dans sa deuxième année de formation, commence déja à passer des entretiens de stage pré-ambauche, en fait nous retrouvons, à la faculté des sciences, des multinationales dans des sessions de recrutement organisées par les étudiants MQL.',
		content:[
			{
				type:'card',
				title:'Test PsychoTechnique',
				description: 'Les tests psychotechniques sont utilisés pour mesurer les aptitudes logiques, verbales et numériques de l\'étudiant.Ils mesurent les capacités de réaction, de réflexion, de concentration mais aussi la faculté à intégrer et à traiter l’information ou la stimulation.',
				image:'../../resources/pictures/Psytest.jpg',
			},
			{
				type:'card',
				title:'Test Technique',
				description: 'Un entretien technique  sur les différents aspects du developpement informatique.',
				image:'../../resources/pictures/TechTest.jpg',
			},
			{
				type:'card',
				title:'Test Technique',
				description: 'Un entretien technique  sur les différents aspects du developpement informatique.',
				image:'../../resources/pictures/HRInter.jpg',
			},
			{
				type:'image-show',
				title:'Galerie',
				images: dbEventBook1,
			},
		],
	},
	{
		id:2,
		title: 'Journée Entrepreunariat: Novembre',
		description: 'Les étudiants MQL organisent une journée entrepreneuriat, dont des équipes de différents masters présentent leurs projets devant un jury pour une durée de 7 minutes.',
		content: [
			{
				type:'image-show',
				title:'Gallerie',
				images: dbEventBook2,
			}
		],
	},
	{
		id:3,
		title: 'Cérémonie de remise de diplomes : Mars-Avril',
		description: 'La cérémonie de remise de diplômes est une cérémonie organisée afin de celebrer les jeunes diplomés, que la majorité ont déjâ des contrats CDI avec des multinationales notamment CGI,Capgemini,ATOS .... , Cliquez pour voir plus sur nos lauréats.',
		content: [
			{
				type:'image-grid',
				title:'Galerie',
				description:'',
				images: ['../../resources/pictures/Events/economiste.jpg','../../resources/pictures/Events/CE1.jpg'],
			},
			{
				type:'image-grid',
				title:'Gallerie',
				description:'Les lauréats MQL ne s\'arretent pas à l\'insertion professionnelle mais excellent dans leurs postes professionnels et deviennent des éléments clé pour le developpement des multinationales. ils aident également les nouvelles générations( formations, informations ...) dans une solidarité familiale.',
				images: [
					'../../resources/pictures/Events/CE2-1.jpg',
					'../../resources/pictures/Events/CE2-2.jpg',
				],
			},
		],
	},
	{
		id:4,
		title:'Evenements para-scolaire',
		description:'MQL dépasse les limtes de formation et éducation; MQL est une équipe, une famille, un style de vie.',
		content: [
			{
				type:'image-grid',
				title:'Galerie',
				description:'',
				images: ['../../resources/pictures/mqlfam.JPG'],
			},
		],
	},


];


