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
		title:'Compagnes de stages',
		date : 'À partir d\'octobre',
		description:'Un Mqliste, dans sa deuxième année de formation, commence déjà  à passer des entretiens de stage pré-ambauche, en fait nous retrouvons, à la faculté des sciences, des multinationales dans des sessions de recrutement organisées par les étudiants MQL.' +
			' Ces compagnes de stages se déroulent généralemenet en 3 phases : ',
		content:[
			{
				type:'card',
				title:'Test PsychoTechnique',
				description: 'Les tests psychotechniques sont utilisés pour mesurer les aptitudes logiques, verbales et numériques de l\'étudiant. Ils mesurent les capacités de réaction, de réflexion, de concentration mais aussi la faculté à intégrer et à traiter l’information ou la stimulation.',
				image:'../../resources/pictures/Psytest.jpg',
			},
			{
				type:'card',
				title:'Test Technique',
				description: 'Un entretien technique  sur les différents aspects du developpement informatique selon le besoin de l\'entreprise.',
				image:'../../resources/pictures/TechTest.jpg',
			},
			{
				type:'card',
				title:'Entretien RH',
				description: 'Le candidat doit mettre en avant son expérience, ses compétences et sa personnalité à travers la description de son parcours professionnel.',
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
		title: 'Journée Entrepreunariat',
		date:'Novembre',
		description: 'Les étudiants MQL organisent une journée entrepreneuriat, dont des équipes de différents masters présentent leurs projets devant un jury pour une durée de 7 minutes.',
		content: [
			{
				type:'image-show',
				title:'Galerie',
				images: dbEventBook2,
			}
		],
	},
	{
		id:3,
		title: 'Cérémonie de remise de diplomes',
		date:'Mars-Avril',
		description: 'La cérémonie de remise de diplômes est une cérémonie organisée afin de célébrer nos jeunes diplomés, que la majorité ont déjâ signés contrats CDI avec des multinationales notamment Capgemini,CGI,ATOS .... ',
		content: [
			{
				type:'image-grid',
				title:'Galerie',
				description:'',
				images: ['../../resources/pictures/Events/economiste.jpg','../../resources/pictures/Events/CE1.jpg'],
			},
			{
				type:'image-grid',
				title:'Galerie',
				description:'Les lauréats MQL ne s\'arretent pas à l\'insertion professionnelle mais excellent dans leurs parcours professionnels et deviennent des éléments clé pour le developpement de ses entreprises. ils aident également les nouvelles générations( formations, informations ...) dans une solidarité familiale.',
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
		date:'',
		description:'MQL dépasse les limtes de la formation et l\'éducation; MQL est une équipe, une famille, un style de vie.',
		content: [
			{
				type:'image-grid',
				title:'Galerie',
				description:'',
				images: ['../../resources/pictures/mqlfam.JPG','../../resources/pictures/sortie.jpg'],
			},
		],
	},
];


