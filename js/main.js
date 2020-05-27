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
let grant_access = false;
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
        if(tag_id !== null) {
            url.href = path + 'components/' + component + '/' + component + '.html' + '#' + tag_id;
        } else
            url.href = path + 'components/' + component + '/' + component + '.html';
    }
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Build up the header using given parameters
 * @returns {string}
 */
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
        {name: 'Laureate', content:'Nos Lauréats'},
        {name: 'Area', content:'Votre Espace'},
    ];
    /* HEADER --------------------------------------------------------------------------------------------------------*/
    let headerContent = '<header class="div-center">' +
        '<img id="title-image" src="" alt="title" />' +
        '<div class="phone-header" id="phone-header">' +
        '<div class="move-left"><img onclick="route(\'../Home\')" src="../../resources/pictures/logoMQL.png" alt="lm" width="150" height="90" ' +
        'id="mini-logo"></div>' +
        '<div class="move-right" onclick="showMenu()"><img src="../../resources/pictures/menu-phone.png" alt="mp" ' +
        'id="menu-button" width="60" height="60"></div>' +
        '</div>' +
        '<div class="topnav">\n';
    // DYNAMIC NAVS
    for(let nav of navs) {
        headerContent += '<a href="#' + nav.name +
            '"class="left" onclick="route(\'../' + nav.name + '\')"' +
            'onmouseover="changePicture(this.name)" ' +
            'onmouseleave="changePicture(current_component)" ' +
            'name="' + nav.name + '">' + nav.content + '</a>\n'
    }
    // ABOUT NAV
    headerContent += '<a href="#footer" class="right"><img class="def-img" src="../../resources/pictures/about.png" ' +
        'alt="about"></a>' +
        '</div>' +
        '</header>';
    return headerContent;
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
function getSearchBar() {
    return '<div class="search-block">\n' +
        '<img src="../../resources/pictures/search.png" class="search-logo" alt="search Logo">\n' +
        '<input id="key" onkeyup="view.filterKey()" placeholder="Search..." class="search-input" type="text">\n' +
        '</div>\n' +
        '<!-- Text Box -->\n' +
        '<div id="TextBox" class="modal">\n' +
        '<span onclick="closeTB()" class="close">&times;</span>\n' +
        '<div class="box-content">\n' +
        '<img src="" alt="" id="BoxIcon" class="box-icon">\n' +
        '<p id="BoxText" class="box-text"></p>\n' +
        '</div>\n' +
        '</div>';
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Build up the footer using given parameters
 * @returns {string}
 */
function getFooterContent() {
    let partners = [
        {name:'CAP', image:'../../resources/partenaires/capgemeni.png'},
        {name:'UMANIS', image:'../../resources/partenaires/umanis.png'},
        {name:'ATOS', image:'../../resources/partenaires/atos.png'},
        {name:'CGI', image:'../../resources/partenaires/cgi.png'},
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
                }
            ],
        }
    ];
    let footerContent = '<hr><footer>' +
        '<div class="text-partenaire">\n' +
        '<img class="right-space" src="../../resources/pictures/icons/partners.png" alt="partners" ' +
        'width="80" height="46"><span>Partenaires</span> \n' +
        '</div><hr>\n' +
        '<div class="partenaire">\n';
    for(let partner of partners) {
        footerContent += '<span><a><img id="' + partner.name + '" onclick="route(\'../Partner\',\'' + partner.name + '\')" class="img-partenaire" src="' + partner.image + '" alt="' +
            partner.name + '"></a></span>\n';
    }
    footerContent += '</div>\n' +
        '<div class="background-space"></div>\n' +
        '<div class="flex-container">\n';
        for(let foot of foots) {
            footerContent += '<div>\n' +
                '<h5>' + foot.title + '</h5>\n' +
                '<ul class="remove-space">\n';
            for(let c of foot.content) {
                if(c.type === 'link') {
                    footerContent += '<li><a class="links" href="' + c.link_address + '">' + c.link_name + '</a></li>\n';
                }
                if(c.type === 'list') {
                    footerContent += '<li><strong>' + c.list_title + '</strong>' + c.list_content + '</li>\n';
                }
                if(c.type === 'geo') {
                    footerContent += '<div class="map"><div class="over-flow">\n' +
                        '<iframe src="' + c.source + '" class="map-size" frameborder="0" style="border:0;" ' +
                        'allowfullscreen="true" aria-hidden="false" tabindex="0"></iframe>\n' +
                        '</div></div>\n';
                }
            }
            footerContent += '</ul></div>\n';
        }
        footerContent += '</div><div class="copy-right"><span>Master Qualité du Logiciel,' +
            '<a href="#"> Faculté des sciences</a></span><span>&copy; 2020 All rights reserved</span></div>';
    return footerContent;
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
function loadResources() {
    /* ASSIGN DATA ---------------------------------------------------------------------------------------------------*/
    document.getElementById('header').innerHTML = getHeaderContent();
    document.getElementById('footer').innerHTML = getFooterContent();
    // SEARCH BAR
    if(document.getElementById('search') !== null) {
        document.getElementById('search').innerHTML = getSearchBar();
    }
    /* CURRENT INITIALIZATION ----------------------------------------------------------------------------------------*/
    let current_element = document.getElementsByName(current_component)[0];
    if(current_component === 'Home') document.getElementById('home-logo').
    setAttribute('src', '../../resources/pictures/homeactive.png')
    current_element.setAttribute('class', current_element.
    getAttribute('class') + ' active');
    current_element.setAttribute('onclick', '');
    current_element.setAttribute('onmouseover', '');
    changePicture(current_component);
    scrollToTop();
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
    let image = document.getElementById('title-image');
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
        let menu = document.getElementsByClassName('topnav')[0];
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
 */
function addTitleIcon(source) {
    let titles = document.getElementsByClassName('title');
    let i=0;
    for (let title of titles) {
        let text = title.textContent;
        title.innerHTML = '<img src="' + source + '" alt="title" class="title-logo">' +
            text+'<img name="sh-icon" src="../../resources/pictures/icons/minus-icon.png"  ' +
            'class="sh-icon" onclick="hide('+i+')">'+'<span class="sh-sep"></span>';
        i++;
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
    let icon = document.getElementsByName('sh-icon')[id];
    let sep = document.getElementsByClassName('sh-sep')[id];
    icon.setAttribute('src','../../resources/pictures/icons/minus-icon.png');
    icon.setAttribute('onclick','hide('+id+', \'' + def_element + '\', \'' + def_display + '\')');
    let element =document.getElementsByClassName(def_element)[id];
    element.style.display = def_display;
    sep.style.display='none';
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
    let icon = document.getElementsByName('sh-icon')[id];
    let sep = document.getElementsByClassName('sh-sep')[id];
    icon.setAttribute('src','../../resources/pictures/icons/plus-icon.png');
    icon.setAttribute('onclick','show(' + id + ', \'' + def_element + '\', \'' + def_display + '\')');
    let element = document.getElementsByClassName(def_element)[id];
    element.style.display = 'none';
    sep.style.display = def_display;
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Auto-add detection on left-menu bar for auto hovering on target article
 */
function detect_subContent_trigger_left_bar() {
    let element0 = document.getElementsByClassName('left-menu')[0];
    for(let child of element0.childNodes) {
        if(child.innerHTML !== undefined && child instanceof HTMLDivElement) {
            let target = child.firstChild;
            if(target.innerHTML !== undefined) {
                target.setAttribute('id', 'nav' + target.getAttribute('href').
                substr(target.getAttribute('href').indexOf('#') + 1));
            }
        }
    }
    let element = document.getElementsByClassName('sub-content')[0];
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
    document.getElementById('nav' + id).classList.add('wrap-red');
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/***
 * Lighting with navigation bar (left-menu) instant hovering works with auto detection
 * @param id
 */
function offLight(id) {
    document.getElementById('nav' + id).classList.remove('wrap-red');
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
function closeIMG() {
    let modal = document.getElementById('myModal');
    modal.style.display = 'none';
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Display image
 */
function popIMG(id) {
    let modal = document.getElementById('myModal');
    let img = document.getElementById(id);
    let modalImg = document.getElementById('modal_img');
    modal.style.display = 'block';
    modalImg.src = img.src;
    document.getElementById('caption').innerHTML = img.alt;
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Close TextBox
 */
function closeTB() {
    let modal = document.getElementById('TextBox');
    modal.style.display = 'none';
}
/**
 * Display textbox
 */
function popTB(icon, text) {
    let modal = document.getElementById('TextBox');
    let el_icon = document.getElementById('BoxIcon');
    let el_text = document.getElementById('BoxText');
    el_icon.src = icon;
    el_text.innerHTML = text;
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
function createBook(images=[], default_element_id = 'book') {
    current_img = 1;
    images_size = images.length;
    let element = document.getElementById(default_element_id);
    element.innerHTML = '<div onclick="target(\''+ default_element_id + '\',--current_img)" class="arrow-left"><</div>';
    for(let i = 1; i<=images.length; i++) {
        element.innerHTML += '<img onclick="popIMG(this.id)" id="' + default_element_id + '-img' + i + '" class="' +
            default_element_id + '-img" src="../../resources/pictures/' + images[i-1] + '" alt="MQL PLATFORM">';
    }
    element.innerHTML += '<div onclick="target(\''+ default_element_id + '\',++current_img)" class="arrow-right">></div>';
    document.getElementsByClassName( default_element_id + '-img')[current_img - 1].style.display = 'block';
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Target function for image switching
 */
function target(target_element) {
    if(current_img < 1 ) target(++current_img);
    else if(current_img > images_size) target(--current_img);
    else {
        for(let i=0; i<images_size; i++) {
            document.getElementsByClassName( target_element + '-img')[i].style.display = 'none';
        }
        document.getElementsByClassName( target_element + '-img')[current_img - 1].style.display = 'block';
    }
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/

function scrollToTop(){

    var button = document.getElementById("scroll-top");

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
    }


}

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

