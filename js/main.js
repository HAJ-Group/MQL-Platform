/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*                                *   _            ______      _______    _______   *   _______   _________
              |\    /|     /\     |  |  \   |     |           |          |  ____/   |  |       |      |
              | \  / |    /  \    |  |   \  |      \_____     |          |  \       |  |_______|      |
              |  \/  |   /____\   |  |    \ |            \    |          |   \      |  |              |
              |      |  /      \  |  |     \|      ______|    |_______   |    \     |  |              |
*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
// GLOBAL VARS
let current_component;
let phone_menu_toggled = false;
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
function load() {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const action = async () => {
        popSPLASH();
        await delay(1000);
        route('Home');
    };
    action();
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
function route(component, tag_id=null) {
    if(component !== null) {
        let path;
        if (component.indexOf('../') === 0) {
            component = component.substring(3);
            path = '../../'
        }
        else path = '';
        component += 'Component';
        let url = window.location;
        let target = path + 'components/' + component + '/' + component + '.html';
        console.log(target);
        if(tag_id !== null) {
            /*$('#component').innerHTML =
                '<iframe frameborder="0" scrolling="0" src="' + target + '#' + tag_id + '"></iframe>';*/
            url.href = target;
        } else
            /*$('#component').innerHTML =
                '<iframe frameborder="0" scrolling="0" src="' + target + '"></iframe>';*/
            url.href = target;
    }
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Custom selector used to simplify getting html dom elements
 * @param target_element
 * @returns {HTMLElement|HTMLCollectionOf<HTMLElementTagNameMap[*]>|HTMLCollectionOf<Element>|NodeListOf<HTMLElement>}
 */
function $(target_element) {
    if(target_element.startsWith('#')) return document.getElementById(target_element.substring(1));
    if(target_element.startsWith('.')) return document.getElementsByClassName(target_element.substring(1));
    if(target_element.startsWith('+')) return document.getElementsByName(target_element.substring(1));
    else return document.getElementsByTagName(target_element);
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Build up the header using given parameters
 * @returns {string}
 */
/*function getHeaderContent() {
    let navs = [
        /!*
        * name : value of name attribute related with the title picture and the component
        * content : value of the innerText of the nav
        * *!/
        {name: 'Home', content:'<img id="home-logo" class="def-img" src="../../resources/pictures/home.png" alt="home">'},
        {name: 'News', content:'Actualités'},
        {name: 'Event', content:'Evénements'},
        {name: 'Activity', content:'Activités'},
        {name: 'Partner', content:'Partenaires'},
        {name: 'Laureate', content:'Lauréats'},
        {name: 'Area', content:'Administration'},
    ];
    /!* HEADER --------------------------------------------------------------------------------------------------------*!/
    let headerContent = '<header class="div-center">' +
        '<img id="title-image" src="" alt="title" />' +
        '<div class="phone-header" id="phone-header">' +
        '<div class="move-left"><img onclick="route(\'../Home\')" src="../../resources/pictures/logoMQL.png" alt="lm" width="150" height="90" ' +
        'id="mini-logo"></div>' +
        '<div class="move-right" onclick="showMenu()"><img src="../../resources/pictures/menu-phone.png" alt="mp" ' +
        'id="menu-button" width="60" height="60"></div>' +
        '</div>' +
        '<div class="topnav"> ';
    // DYNAMIC NAVS
    for(let nav of navs) {
        headerContent += '<a href="#' + nav.name +
            '"class="left" onclick="route(\'../' + nav.name + '\')"' +
            'onmouseover="changePicture(this.name)" ' +
            'onmouseleave="changePicture(current_component)" ' +
            'name="' + nav.name + '">' + nav.content + '</a> '
    }
    // ABOUT NAV
    headerContent += '<a href="#footer" class="right"><img class="def-img" src="../../resources/pictures/about.png" ' +
        'alt="about"></a>' +
        '</div>' +
        '</header>';
    return headerContent;
}*/
function getHeaderContent() {
    let navs = [
        /*
        * name : value of name attribute related with the title picture and the component
        * content : value of the innerText of the nav
        * */
        {name: 'Home', content:'<img id="home-logo" class="def-img" src="../../resources/pictures/home.png" alt="home">'},
        {name: 'News', content:'Actualités'},
        {name: 'Event', content:'Evénements'},
        {name: 'Activity', content:'Activités'},
        {name: 'Partner', content:'Partenaires'},
        {name: 'Laureate', content:'Lauréats'},
        {name: 'Area', content:'Administration'},
    ];
    /* HEADER --------------------------------------------------------------------------------------------------------*/
    let headerElement = buildElement('header',[
        buildIMG('', 'title', id('title-image')),
        buildDIV([
            buildDIV([
                buildIMG('../../resources/pictures/logoMQL.png', 'lm', id('mini-logo', [
                    {name:'onclick', value:'route(\'../Home\')'},
                    {name:'width', value:'150'},
                    {name:'height', value:'90'},
                ]))
            ], cls('move-left')),
            buildDIV([
                buildIMG('../../resources/pictures/menu-phone.png', 'mp', id('menu-button', [
                    {name:'onclick', value:'showMenu()'},
                    {name:'width', value:'60'},
                    {name:'height', value:'60'},
                ]))
            ], cls('move-right'))
        ], wrapCI('phone-header', 'phone-header'))
    ], cls('div-center'));
    let navElement = buildDIV(null, cls('topnav'));
    // DYNAMIC NAVS
    for(let nav of navs) {
        navElement.appendChild(buildLINK('#' + nav.name, nav.content, cls('left', [
            {name:'onclick', value:'route(\'../' + nav.name + '\')'},
            {name:'onmouseover', value:'changePicture(this.name)'},
            {name:'onmouseleave', value:'changePicture(current_component)'},
            {name:'name', value:nav.name},
        ])))
    }

/*
    // Search icon
    navElement.appendChild(buildLINK('#',
        buildIMG('../../resources/pictures/search.png',
        '', cls(['left', 'global-search-icon']))
    ));
*/

    // ABOUT NAV
    navElement.appendChild(buildLINK('#footer', [
        buildIMG('../../resources/pictures/about.png', 'about', cls('def-img'))
    ], cls('right')));
    headerElement.appendChild(navElement);
    return headerElement;
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*function getSearchBar() {
    return '<div class="search-block"> ' +
        '<img src="../../resources/pictures/search.png" class="search-logo" alt="search Logo"> ' +
        '<input id="key" onkeyup="view.filterKey()" placeholder="Search..." class="search-input" type="text"> ' +
        '<span class="error-message"></span>' +
        '</div> ' +
        '<!-- Text Box --> ' +
        '<div id="TextBox" class="modal"> ' +
        '<span onclick="closeTB()" class="close">&times;</span> ' +
        '<div class="box-content"> ' +
        '<img src="" alt="" id="BoxIcon" class="box-icon"> ' +
        '<p id="BoxText" class="box-text"></p> ' +
        '</div> ' +
        '</div>';
}*/
function getSearchBar() {
    return buildDIV([
        buildIMG('../../resources/pictures/search.png', 'search Logo', cls('search-logo')),
        buildElement('input', null, wrapIC('key', 'search-input', [
            {name:'onkeyup', value:'view.filterKey()'},
            {name:'placeholder', value:'Search...'},
            {name:'type', value:'text'},
        ])),
        buildSPAN(null, cls('error-message'))
    ], cls('search-block'));
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
function showEmptyErrorResult() {
    $('#main').innerHTML = '<div>' +
        '<img alt="" class="mini-logo" src="../../resources/pictures/Area/error.png">' +
        '</div>';
    $('#navigation').innerHTML = null;
    $('#switcher').innerHTML = null;
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Build up the footer using given parameters
 * @returns {string}
 */
/*function getFooterContent() {

    let partners = [
        {id:1,name:'CAP', image:'../../resources/partenaires/capgemeni.png'},
        {id:3,name:'UMANIS', image:'../../resources/partenaires/umanis.png'},
        {id:4,name:'ATOS', image:'../../resources/partenaires/atos.png'},
        {id:2,name:'CGI', image:'../../resources/partenaires/cgi.png'},
    ];
    let foots = [
        {   // LEFT SIDE
            title:'Lien utiles',
            content:[
                {
                    type:'link',
                    link_name:'Université Sidi Mohamed Ben Abdellah',
                    link_address:'http://www.usmba.ac.ma/',
                },
                {
                    type:'link',
                    link_name:'Faculté des sciences DHER EL-MEHRAZ',
                    link_address:'http://www.fsdmfes.ac.ma/',
                },
            ],
        },
        {
            // CENTER SIDE
            title: 'Localisation',
            content:[
                {
                    type:'geo',
                    source:'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1653.2037839986274!2d-4.9779526!3d34.0334149!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd9f8b5f7be79403%3A0x64ed183ba63abde7!2sFacult%C3%A9%20des%20Sciences%20Dhar%20El%20Mehraz!5e0!3m2!1sfr!2sma!4v1589646925624!5m2!1sfr!2sma'
                }
            ],
        },
        {   // RIGHT SIDE
            title: 'Contact',
            content: [
                {
                    type:'list',
                    list_title:'Coordonnateur : ',
                    list_content:'Noureddine Chenfour'
                },
                {
                    type:'list',
                    list_title:'Adresse : ',
                    list_content:'Département d’Informatique , Faculté des sciences Dhar El Mahraz'
                },
                {
                    type:'list',
                    list_title:'BP.1796, Fès-Atlas, Maroc',
                    list_content:''
                },
                {
                    type:'list',
                    list_title:'E.mail : ',
                    list_content:'noureddine.chenfour@usmba.ac.ma'
                },
                {
                    type: 'direct-contact'
                }
            ],
        }
    ];

    let footerContent = '<hr><footer>' +
        '<div class="text-news-letter" onclick="$(\'#news-modal-id\').style.display = \'block\'" id="newsBlocks">' +
        '<span style="font-size: 17px;color: white;" > S\'inscrire à notre NewsLetter </span>' +
        '</div><hr> ';
         footerContent += '<div class="text-partenaire"> ' +
        '<img class="right-space" src="../../resources/pictures/icons/partners.png" alt="partners" ' +
        'width="80" height="46"><span>Partenaires</span>  ' +
        '</div><hr> ' +
        '<div class="partenaire"> ';
    for(let partner of partners) {
        footerContent += '<span><a><img id="partner-' + partner.id + '" onclick="route(\'../Partner\',\'' + partner.id + '\')" class="img-partenaire" src="' + partner.image + '" alt="' +
            partner.name + '"></a></span> ';
    }
    footerContent += '</div> ' +
        '<div class="background-space"></div> ' +
        '<div class="flex-container"> ';
        for(let foot of foots) {
            footerContent += '<div> ' +
                '<h5>' + foot.title + '</h5> ' +
                '<ul class="remove-space"> ';
            for(let c of foot.content) {
                if(c.type === 'link') {
                    footerContent += '<li><a class="links" href="' + c.link_address + '">' + c.link_name + '</a></li> ';
                }
                if(c.type === 'list') {
                    footerContent += '<li id="direct-contact-element"><strong>' + c.list_title + '</strong>' + c.list_content + '</li> ';

                }
                if(c.type === 'direct-contact'){
                    footerContent += '<li><button onclick="$(\'#form-contact-id\').style.display=\'block\'" style="width:auto;" class="button-contact">Contactez-nous directement !</button></li>';
                }
                if(c.type === 'geo') {
                    footerContent += '<div class="map"><div class="over-flow"> ' +
                        '<iframe src="' + c.source + '" class="map-size" frameborder="0" style="border:0;" ' +
                        'allowfullscreen="true" aria-hidden="false" tabindex="0"></iframe> ' +
                        '</div></div> ';
                }

            }
            footerContent += '</ul></div> ';
        }
        // Copy-right
        footerContent += '</div><div class="copy-right"><span>Master Qualité du Logiciel,' +
            '<a href="#"> Faculté des sciences</a></span><span>&copy; 2020 All rights reserved</span></div>';
         // Elements for form-contact
        footerContent += '<div id="form-contact"></div>';
         // Elements for newsLetter
        footerContent += '<a href="#" class="button-news" id="news-button"></a>';
        footerContent += '<div id="news-cont"></div>';
        return footerContent;
}*/
function getFooterContent() {
    let partners = [
        {id:1,name:'CAP', image:'../../resources/partenaires/capgemeni.png'},
        {id:3,name:'UMANIS', image:'../../resources/partenaires/umanis.png'},
        {id:4,name:'ATOS', image:'../../resources/partenaires/atos.png'},
        {id:2,name:'CGI', image:'../../resources/partenaires/cgi.png'},
    ];
    let foots = [
        {   // LEFT SIDE
            title:'Lien utiles',
            content:[
                {
                    type:'link',
                    link_name:'Université Sidi Mohamed Ben Abdellah',
                    link_address:'http://www.usmba.ac.ma/',
                },
                {
                    type:'link',
                    link_name:'Faculté des sciences DHER EL-MEHRAZ',
                    link_address:'http://www.fsdmfes.ac.ma/',
                },
            ],
        },
        {
            // CENTER SIDE
            title: 'Localisation',
            content:[
                {
                    type:'geo',
                    source:'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1653.2037839986274!2d-4.9779526!3d34.0334149!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd9f8b5f7be79403%3A0x64ed183ba63abde7!2sFacult%C3%A9%20des%20Sciences%20Dhar%20El%20Mehraz!5e0!3m2!1sfr!2sma!4v1589646925624!5m2!1sfr!2sma'
                }
            ],
        },
        {   // RIGHT SIDE
            title: 'Contact',
            content: [
                {
                    type:'list',
                    list_title:'Coordonnateur : ',
                    list_content:'Noureddine Chenfour'
                },
                {
                    type:'list',
                    list_title:'Adresse : ',
                    list_content:'Département d’Informatique , Faculté des sciences Dhar El Mahraz'
                },
                {
                    type:'list',
                    list_title:'BP.1796, Fès-Atlas, Maroc',
                    list_content:''
                },
                {
                    type:'list',
                    list_title:'E.mail : ',
                    list_content:'noureddine.chenfour@usmba.ac.ma'
                },
                {
                    type: 'direct-contact'
                }
            ],
        }
    ];
    let footerElement = buildElement('footer', [
       buildDIV([
           buildSPAN('S\'inscrire à notre NewsLetter', wrap([
               {name:'style', value:'font-size: 17px;color: white;'},
           ]))
       ], wrapCI('text-news-letter', 'newsBlocks', [
           {name:'onclick', value:'$(\'#news-modal-id\').style.display = \'block\''}
       ])),
       buildHR(),
       buildDIV([
           buildIMG('../../resources/pictures/icons/partners.png', 'partners', cls('right-space', [
               {name:'width', value:'80'},
               {name:'height', value:'46'},
           ])),
           buildSPAN('Partenaires')
       ], cls('text-partenaire')),
       buildHR()
    ]);
    let partnersDiv = buildDIV(null, cls('partenaire'));
    for(let partner of partners) {
        partnersDiv.appendChild(buildSPAN([
            buildLINK('', [
                buildIMG(partner.image, '', wrapIC('partner-' + partner.id, 'img-partenaire', [
                    {name:'onclick', value:'route(\'../Partner\',\'' + partner.id + '\')'},
                ]))
            ])
        ]));
    }
    footerElement.appendChild(partnersDiv);
    footerElement.appendChild(buildDIV(null, cls('background-space')));
    let footerDiv = buildDIV(null, cls('flex-container'));
        for(let foot of foots) {
            let container = buildDIV(buildElement('h5', foot.title));
            let list = buildElement('ul', null, cls('remove-space'));
            for(let c of foot.content) {
                if(c.type === 'link') {
                    list.appendChild(buildElement('li', [
                        buildLINK(c.link_address, c.link_name, cls('links'))
                    ]));
                }
                if(c.type === 'list') {
                    list.appendChild(buildElement('li', [
                        buildElement('strong', c.list_title),
                        c.list_content
                    ], id('direct-contact-element')));
                }
                if(c.type === 'direct-contact'){
                    list.appendChild(buildElement('li', [
                        buildElement('button', 'Contactez-nous directement !', cls('button-contact', [
                            {name:'onclick', value:'$(\'#form-contact-id\').style.display=\'block\''},
                            {name:'style', value:'width:auto;'},
                        ]))
                    ]));
                }
                if(c.type === 'geo') {
                    list.appendChild(buildDIV([
                        buildDIV([
                            buildElement('iframe', null, cls('map-size', [
                                {name:'src', value:c.source},
                                {name:'frameborder', value:'0'},
                                {name:'style', value:'border:0;'},
                                {name:'allowfullscreen', value:'true'},
                                {name:'aria-hidden', value:'false'},
                                {name:'tabindex', value:'0'},
                            ]))
                        ], cls('over-flow'))
                    ], cls('map')));
                }
            }
            container.appendChild(list);
            footerDiv.appendChild(container);
        }
        footerElement.appendChild(footerDiv);
        // Copy-right
        footerElement.appendChild(buildDIV([
            buildSPAN([
                'Master Qualité du Logiciel,',
                buildLINK('#', 'Faculté des sciences'),
            ]),
            buildSPAN('&copy; 2020 All rights reserved'),
        ], cls('copy-right')));
         // Elements for form-contact
        footerElement.appendChild(buildDIV(null, id('form-contact')));
        //  // Elements for newsLetter
        footerElement.appendChild(buildLINK('#', null, wrapCI('button-news', 'news-button')));
        footerElement.appendChild(buildDIV(null, id('news-cont')));
        return footerElement;
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
function loadResources() {
    /* ASSIGN DATA ---------------------------------------------------------------------------------------------------*/
    // $('#header').innerHTML = getHeaderContent();
    $('#header').appendChild(getHeaderContent());
    // $('#footer').innerHTML = getFooterContent();
    $('#footer').appendChild(getFooterContent());
    // SEARCH BAR
    if($('#search') !== null) {
        // $('#search').innerHTML = getSearchBar();
        $('#search').appendChild(getSearchBar());
    }
    /* CURRENT INITIALIZATION ----------------------------------------------------------------------------------------*/
    let current_element = $('+' + current_component)[0];
    if(current_component === 'Home') $('#home-logo').
    setAttribute('src', '../../resources/pictures/homeactive.png')
    current_element.setAttribute('class', current_element.
    getAttribute('class') + ' active');
    current_element.setAttribute('onclick', '');
    current_element.setAttribute('onmouseover', '');
    changePicture(current_component);
    scrollToTop();
    loadContactForm();
    loadNewsLetter();
    closeModal();
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/* Action Functions */
/**
 * Change title image
 * @param element
 */
function changePicture(element) {
    let image = $('#title-image');
    let source = element + '.jpg';
    image.setAttribute('src', '../../resources/pictures/' + source);
    image.setAttribute('class', 'def-img');
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Showing/hiding phone version menu
 */
function showMenu() {
    function toggle(media) {
        let menu = $('.topnav')[0];
        if (media.matches) { // If media query matches
            if(phone_menu_toggled) menu.style.display = 'block';
            if(!phone_menu_toggled) menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
    }
    phone_menu_toggled = !phone_menu_toggled;
    let media = window.matchMedia("(max-width: 600px)");
    toggle(media);
    media.addListener(toggle);
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Building title configuration (icon + show and hide button)
 * @param source
 * @param editable
 */
/*function addTitleIcon(source, editable=false) {
    let titles = $('.title');
    let i=0;
    for (let title of titles) {
        let text = title.textContent;
        title.innerHTML = '<div class="title-content"><img src="' + source + '" alt="title" class="title-logo">' +
            text+'</div><img name="sh-icon" src="../../resources/pictures/icons/minus-icon.png" alt=""  ' +
            'class="sh-icon" onclick="hide('+i+')">'+'<span class="sh-sep"></span>';
        if(editable && sessionStorage.getItem('ACCESS') !== null) {
            // ADD EDIT AND DELETE ICONS
            title.innerHTML += '<img name="edit-icon" src="../../resources/pictures/icons/edit.png" alt=""  ' +
                'class="sh-icon" onclick="view.editData(' + i + ')">' +
                '<img name="delete-icon" src="../../resources/pictures/icons/delete.png" alt=""  ' +
                'class="sh-icon" onclick="view.deleteData(' + i + ')">';
        }
        i++;
    }
    if(editable && sessionStorage.getItem('ACCESS') !== null) {
        // ADD NEW ICON BLOCK
        let saver = $('.sub-content')[0];
        saver.innerHTML = '<div class="new-block"><img onclick="view.addData()" src="../../resources/pictures/icons/new-icon.png" alt="" class="new-icon"></div>' +
            saver.innerHTML;
    }
}*/
function addTitleIcon(source, editable=false) {
    let titles = $('.title');
    let i=0;
    for (let title of titles) {
        let text = title.textContent;
        title.innerHTML = '';
        title.appendChild(buildDIV([
            buildIMG(source, 'title', cls('title-logo')),
            text
        ], cls('title-content')));
        title.appendChild(buildIMG('../../resources/pictures/icons/minus-icon.png', '', wrapICN('', 'sh-icon', 'sh-icon', [
            {name:'onclick', value:'hide('+i+')'}
        ])));
        title.appendChild(buildSPAN(null, cls('sh-sep')));
        if(editable && sessionStorage.getItem('ACCESS') !== null) {
            // ADD EDIT AND DELETE ICONS
            title.appendChild(buildIMG('../../resources/pictures/icons/edit.png', '', wrapICN('', 'sh-icon', 'edit-icon', [
                {name:'onclick', value:'view.editData(' + i + ')'}
            ])));
            title.appendChild(buildIMG('../../resources/pictures/icons/delete.png', '', wrapICN('', 'sh-icon', 'delete-icon', [
                {name:'onclick', value:'view.deleteData(' + i + ')'}
            ])));
        }
        i++;
    }
    if(editable && sessionStorage.getItem('ACCESS') !== null) {
        // ADD NEW ICON BLOCK
        let saver = $('.sub-content')[0];
        let content = saver.innerHTML;
        saver.innerHTML = '';
        saver.appendChild(buildDIV([
            buildIMG('../../resources/pictures/icons/new-icon.png', '', cls('new-icon', [
                {name:'onclick', value:'view.addData()'}
            ]))
        ], cls('new-block')));
        saver.innerHTML += content;
    }
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Action method show details block
 * @param id
 * @param def_element
 * @param def_display
 */
function show(id, def_element = 'details', def_display = 'block') {
    let icon = $('+sh-icon')[id];
    let sep = $('.sh-sep')[id];
    icon.setAttribute('src','../../resources/pictures/icons/minus-icon.png');
    icon.setAttribute('onclick','hide('+id+', \'' + def_element + '\', \'' + def_display + '\')');
    let element = $('.' + def_element)[id];
    element.style.display = def_display;
    sep.style.display='none';
    // HIDE EDIT AND DELETE IF EXISTS
    if(sessionStorage.getItem('ACCESS') !== null) {
        let edit = $('+edit-icon')[id];
        let delt = $('+delete-icon')[id];
        edit.style.display = 'block';
        delt.style.display = 'block';
    }
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Action method hide details block
 * @param id
 * @param def_element
 * @param def_display
 */
function hide(id, def_element = 'details', def_display = 'block') {
    let icon = $('+sh-icon')[id];
    let sep = $('.sh-sep')[id];
    icon.setAttribute('src','../../resources/pictures/icons/plus-icon.png');
    icon.setAttribute('onclick','show(' + id + ', \'' + def_element + '\', \'' + def_display + '\')');
    let element = $('.' + def_element)[id];
    element.style.display = 'none';
        sep.style.display = def_display;
    // HIDE EDIT AND DELETE IF EXISTS
    if(sessionStorage.getItem('ACCESS') !== null) {
        let edit = $('+edit-icon')[id];
        let delt = $('+delete-icon')[id];
        edit.style.display = 'none';
        delt.style.display = 'none';
    }
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Auto-add detection on left-menu bar for auto hovering on target article
 */
function detect_subContent_trigger_left_bar() {
    let element0 = $('.left-menu')[0];
    for(let child of element0.childNodes) {
        if(child.innerHTML !== undefined && child instanceof HTMLDivElement) {
            let target = child.firstChild;
            if(target.innerHTML !== undefined) {
                target.setAttribute('id', 'nav' + target.getAttribute('href').
                substr(target.getAttribute('href').indexOf('#') + 1));
            }
        }
    }
    let element = $('.sub-content')[0];
    for(let child of element.childNodes) {
        if(child.innerHTML !== undefined) {
            child.setAttribute('onmouseover', 'lightNav(this.id)');
            child.setAttribute('onmouseleave', 'offLight(this.id)')
        }
    }
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/***
 * Lighting with navigation bar (left-menu) instant hovering works with auto detection
 * @param id
 */
function lightNav(id) {
    try {
        $('#nav' + id).classList.add('wrap-red');
    } catch (e) {}
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/***
 * Lighting with navigation bar (left-menu) instant hovering works with auto detection
 * @param id
 */
function offLight(id) {
    try {
        $('#nav' + id).classList.remove('wrap-red');
    } catch (e) {}
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Split an array into n arrays
 * @param array
 * @param n
 * @returns {[]}
 */
function split(array, n) {
    let ret = [];
    for (let i = 0; i < array.length; i += n){
        ret.push(array.slice(i, i + n));
    }
    return ret;
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Close popped image
 */
function closeSPLASH() {
    let modal = $('#splash');
    modal.style.display = 'none';
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Display image
 */
function popSPLASH() {
    let modal = $('#splash');
    modal.style.display = 'block';
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Close popped image
 */
function closeIMG() {
    let modal = $('#myModal');
    modal.style.display = 'none';
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Display image
 */
function popIMG(id) {
    let modal = $('#myModal');
    let img = $('#' + id);
    let modalImg = $('#modal_img');
    modal.style.display = 'block';
    modalImg.src = img.src;
    $('#caption').innerHTML = img.alt;
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Close TextBox
 */
function closeTB() {
    let modal = $('#TextBox');
    modal.style.display = 'none';
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Display textbox
 */
function popTB(icon, text) {
    let modal = $('#TextBox');
    let el_icon = $('#BoxIcon');
    let el_text = $('#BoxText');
    el_icon.src = icon;
    el_text.innerHTML = text;
    modal.style.display = 'block';
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Close Form
 */
function closeFORM(target_block = 'form') {
    let modal = $('#' + target_block);
    modal.style.display = 'none';
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Display form
 */
function popFORM(target_block = 'form') {
    let modal = $('#' + target_block);
    modal.style.display = 'block';
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Global uses for functions bellow
 * @type {number}
 */
let current_img = 1;
let images_size = 0;
/**
 * Create book of images using a base data table
 * @param images
 * @param default_element_id
 */
/*function createBook(images=[], default_element_id = 'book') {
    current_img = 1;
    images_size = images.length;
    let element = $('#' + default_element_id);
    element.innerHTML = '<div onclick="target(\''+ default_element_id + '\',--current_img)" class="arrow-left"><</div>';
    for(let i = 1; i<=images.length; i++) {
        element.innerHTML += '<img onclick="popIMG(this.id)" id="' + default_element_id + '-img' + i + '" class="' +
            default_element_id + '-img" src="../../resources/pictures/' + images[i-1] + '" alt="MQL PLATFORM">';
    }
    element.innerHTML += '<div onclick="target(\''+ default_element_id + '\',++current_img)" class="arrow-right">></div>';
    $( '.' + default_element_id + '-img')[current_img - 1].style.display = 'block';
}*/
function createBook(images=[], default_element_id = 'book') {
    current_img = 1;
    images_size = images.length;
    let element = $('#' + default_element_id);
    element.appendChild(buildDIV('<', cls('arrow-left', [
        {name:'onclick', value:'target(\''+ default_element_id + '\',--current_img)'},
    ])));
    for(let i = 1; i<=images.length; i++) {
        element.appendChild(buildIMG('../../resources/pictures/' + images[i-1], 'MQL PLATFORM',
            wrapIC(default_element_id + '-img' + i, default_element_id + '-img', [
                {name:'onclick', value:'popIMG(this.id)'}
            ])));
    }
    element.appendChild(buildDIV('>', cls('arrow-right', [
        {name:'onclick', value:'target(\''+ default_element_id + '\',++current_img)'},
    ])));
    $( '.' + default_element_id + '-img')[current_img - 1].style.display = 'block';
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Target function for image switching
 */
function target(target_element) {
    if(current_img < 1 ){
        current_img = images_size;
        target(target_element);
    }
    else if(current_img > images_size){
        current_img = 1;
        target(target_element);
    }
    else {
        try{
            for(let i=0; i<images_size; i++) {
                $( '.' + target_element + '-img')[i].style.display = 'none';
            }
            $( '.' + target_element + '-img')[current_img - 1].style.display = 'block';
        } catch (e) {}
    }
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * A function to test if the right icon will be displayed or not
 */
function scrollToTop(){
    let button = $("#scroll-top");
    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {
        scrollFunction()
    };
    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            button.style.display = "block";

        } else {
            button.style.display = "none";
        }
        if(window.innerWidth < 700){
            button.style.display = "none";
        }
    }
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * scrolling to top
 */

function topFunction() {
/*    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;*/

let timeout;

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        window.scrollBy(0,-50);
        timeout = setTimeout('topFunction()', 8);
    } else {
        clearTimeout(timeout);
    }
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
function formattedDate(d = new Date) {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${day}-${month}-${year}`;
}
function transformDate(date, sep = '-') {
    let tmp = date.split(sep);
    return tmp[1] + sep + tmp[0] + sep + tmp[2];
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Wait Xms before executing next line
 * @param ms
 */
function wait(ms){
    let start = new Date().getTime();
    let end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Load the content of the form contact
 */
/*function loadContactForm() {
    let form = $('#form-contact');
    form.innerHTML += ' ' +
        '<div id="form-contact-id" class="modal-style">' +
        '<span onclick="$(\'#form-contact-id\').style.display=\'none\'" class="close-modal-contact" title="Close Modal">&times;</span> ' +
        '<form class="modal-contact-content" > ' +
        '<div class="contact-container">' +
        '<h3 style="text-align: center">Contactez-nous directement</h3>' +
        '<hr>' +
        '<label for="first-name"><b>Prénom</b></label>' +
        '<input class="zone-text-contact-news" type="text" placeholder="Prénom..." name="first-name">' +
        '<label for="last-name"><b>Nom </b></label>' +
        '<input class="zone-text-contact-news" type="text" placeholder="Nom..." name="last-name">' +
        '<label for="email"><b>Email </b></label>' +
        '<input class="zone-text-contact-news" type="email" placeholder="Email..." name="email">' +
        '<label for="subject">Sujet </label>' +
        '<textarea class="zone-text-contact-news" id="subject" name="subject" placeholder="Ecrire ici..." style="height:200px"></textarea>' +
        '<div class="form-footer"> ' +
        '<button  onclick="$(\'#form-contact-id\').style.display=\'none\'" class="button-contact-2 cancel-button">Annuler</button> ' +
        '<button class="button-contact-2 submit-button">Envoyer</button> ' +
        '</div>' +
        '</div>' +
        '</form>' +
        '</div>';
}*/
function loadContactForm() {
    let form = $('#form-contact');
    form.appendChild(buildDIV([
        buildSPAN('&times;', cls('close-modal-contact', [
            {name:'onclick', value:'$(\'#form-contact-id\').style.display=\'none\''},
            {name:'title', value:'Close Modal'},
        ])),
        buildElement('form', [
            buildDIV([
                buildElement('h3', 'Contactez-nous directement', wrap([{name:'style', value:'text-align: center'}])),
                buildHR(),
                buildElement('label', buildElement('b', 'Prénom', wrap([{name:'for', value:'first-name'}]))),
                buildElement('input', null, wrapICN('first-name', 'zone-text-contact-news', 'first-name', [
                    {name:'placeholder', value:'Prénom...'},
                    {name:'type', value:'text'},
                ])),
                buildElement('label', buildElement('b', 'Nom', wrap([{name:'for', value:'last-name'}]))),
                buildElement('input', null, wrapICN('last-name', 'zone-text-contact-news', 'last-name', [
                    {name:'placeholder', value:'Nom...'},
                    {name:'type', value:'text'},
                ])),
                buildElement('label', buildElement('b', 'Email', wrap([{name:'for', value:'email'}]))),
                buildElement('input', null, wrapICN('email', 'zone-text-contact-news', 'email', [
                    {name:'placeholder', value:'Email...'},
                    {name:'type', value:'email'},
                ])),
                buildElement('label', buildElement('b', 'Sujet', wrap([{name:'for', value:'subject'}]))),
                buildElement('textarea', null, wrapICN('subject', 'zone-text-contact-news', 'subject', [
                    {name:'placeholder', value:'Ecrire ici...'},
                    {name:'type', value:'email'},
                    {name:'style', value:'height:200px'},
                ])),
                buildDIV([
                    buildElement('button', 'Annuler', cls(['button-contact-2', 'cancel-button'], [
                        [{name:'onclick', value:'$(\'#form-contact-id\').style.display=\'none\''}]
                    ])),
                    buildElement('button', 'Envoyer', cls(['button-contact-2', 'submit-button'])),
                ], cls('form-footer')),
            ], cls('contact-container'))
        ], cls('modal-contact-content')),
    ], wrapIC('form-contact-id', 'modal-style')));
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Load the content of the NewsLetter
 */
/*function loadNewsLetter() {
    let newsLetter = $('#news-cont');
    newsLetter.innerHTML += '<!-- The Modal -->' +
        '<div id="news-modal-id" class="news-modal">' +
        '<!-- Modal content -->' +
        '<form class="news-modal-content" action="#" method="post"> ' +
        '<span class="close-part" onclick="$(\'#news-modal-id\').style.display = \'none\'">&times;</span>' +
        '<div class="modal-header">' +
        '<span>NewsLetter</span>' +
        '</div>' +
        '<div class="modal-body">' +
        '<p>Inscrivez-vous pour recevoir les dernières actualités.</p>' +
        '<lebel for="full-name" style="font-size: 18px;"> Nom : </lebel>' +
        '<input class="zone-text-contact-news" type="text" name="full-name" placeholder="Nom..."> ' +
        '<lebel for="email" style="font-size: 18px;"> Email : </lebel>' +
        '<input class="zone-text-contact-news" type="email" name="email" placeholder="Email..."> ' +
        '</div>' +
        '<button class="subscribe-button" type="submit">S\'inscrire</button>' +
        '</form>' +
        '</div>';
}*/
function loadNewsLetter() {
    let newsLetter = $('#news-cont');
    newsLetter.appendChild(buildDIV([
        buildElement('form', [
            buildSPAN('&times;', cls('close-part', [
                {name:'onclick', value:'$(\'#news-modal-id\').style.display = \'none\''}
            ])),
            buildDIV([
                buildSPAN('NewsLetter')
            ], cls('modal-header')),
            buildDIV([
                buildElement('p', 'Inscrivez-vous pour recevoir les dernières actualités.'),
                buildElement('label', 'Nom', wrap([
                    {name:'for', value:'full-name'},
                    {name:'style', value:'font-size: 18px;'},
                ])),
                buildElement('input', null, wrapICN('full-name', 'zone-text-contact-news', 'full-name', [
                    {name:'placeholder', value:'Nom...'},
                    {name:'type', value:'text'},
                ])),
                buildElement('label', 'Email', wrap([
                    {name:'for', value:'email'},
                    {name:'style', value:'font-size: 18px;'},
                ])),
                buildElement('input', null, wrapICN('email', 'zone-text-contact-news', 'email', [
                    {name:'placeholder', value:'Email...'},
                    {name:'type', value:'email'},
                ])),
            ], cls('modal-body')),
            buildElement('button', 'S\'inscrire', cls('subscribe-button')),
        ], cls('news-modal-content'))
    ], wrapIC('news-modal-id', 'news-modal')));
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Responsible for enabling listeners for contact-form and news-letter on click !
 */
function closeModal() {
    // Get the modal
    let modal = $('#form-contact-id');
    // When the user clicks anywhere outside of the modal, close it

     let newsModal = $('#news-modal-id');
    // Get the button that opens the modal
    let btn = $("#news-button");

    // showing and hiding newsLetter blocks

    // When the user clicks the button, open the modal
    btn.onclick = function() {
        newsModal.style.display = "block";
        btn.style.display = 'none';
    };
    // Get the <span> element that closes the modal
    let span =$(".close-part")[0];
       // When the user clicks on <span> (x), close the modal
       span.onclick = function() {
           newsModal.style.display = "none";
           if(window.innerWidth > 1300){
               btn.style.display = 'flex';
           }
       };
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target === newsModal) {
                newsModal.style.display = "none";
                if(window.innerWidth > 1300){
                    btn.style.display = 'flex';
                }
            }
            else if(event.target === modal){
                modal.style.display = "none";
            }
        }
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 *
 * @param target_block
 * @param target_function
 * @param target_key
 * @param isClass
 */
function setKeysAction(target_block,target_function,target_key='Enter',isClass=false) {
    let block = isClass? $(target_block)[0] : $(target_block);
    try{
        block.addEventListener('keypress',function (event) {
            let key = event.key;
                if(key===target_key) target_function();
        });
    } catch (e) {
       setKeysAction(target_block,target_function,target_key,true);
    }
}

/**
 *
 * @param text
 * @param maxChar
 * @returns {string}
 */
function textShortener(text, maxChar = 40) {
    let ret = '';
    for(let i = 0; i< maxChar; i++) {
        ret += text[i];
    }
    return ret + '...';
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
// AUTO BOX SCRIPTS
let current_autobox_item;
let item_size;
let auto_slider;
/*--------------------------------------------------------------------------------------------------------------------*/
function autoBoxLoader() {
    let items = document.getElementsByClassName('autoBox-item');
    if(items.length > 0) {
        let random = Math.floor(Math.random() * items.length);
        items[random].style.display = 'block';
        current_autobox_item = random;
        item_size = items.length;
    }
    function handler() {
        showABI(Math.floor(Math.random() * items.length));
    }
    auto_slider = setInterval(handler, 5000);
}
/*--------------------------------------------------------------------------------------------------------------------*/
function showABI(index) {
    let items = document.getElementsByClassName('autoBox-item');
    if(item_size > 0) {
        for(let item of items) item.style.display = 'none';
    }
    items[index].style.display = 'block';
    current_autobox_item = index;
}
/*--------------------------------------------------------------------------------------------------------------------*/
function nextABI() {
    if(current_autobox_item === (item_size - 1)) {
        showABI(0);
    }
    else {
        showABI(++current_autobox_item);
    }
}
/*--------------------------------------------------------------------------------------------------------------------*/
function previousABI() {
    if(current_autobox_item === 0) {
        showABI(item_size - 1);
    }
    else {
        showABI(--current_autobox_item);
    }
}
/*--------------------------------------------------------------------------------------------------------------------*/
function pauseABI() {
    clearInterval(auto_slider);
}
/*--------------------------------------------------------------------------------------------------------------------*/
function resumeABI() {
    function handler() {
        showABI(Math.floor(Math.random() * item_size));
    }
    auto_slider = setInterval(handler, 5000);
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*                                *   _            ______      _______    _______   *   _______   _________
              |\    /|     /\     |  |  \   |     |           |          |  ____/   |  |       |      |
              | \  / |    /  \    |  |   \  |      \_____     |          |  \       |  |_______|      |
              |  \/  |   /____\   |  |    \ |            \    |          |   \      |  |              |
              |      |  /      \  |  |     \|      ______|    |_______   |    \     |  |              |
*/
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
