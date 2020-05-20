let current_component;
let phone_menu_toggled = false;

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


function loadResources() {
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
        {name: 'Area', content:'Votre Espace'},
        {name: 'Laureate', content:'Nos Lauréats'},
    ];
    /* HEADER --------------------------------------------------------------------------------------------------------*/
    let headerContent = '<header class="div-center">' +
        '<img id="title-image" src="" alt="title" />' +
        '<div class="phone-header" id="phone-header">' +
        '<div class="move-left"><img src="../../resources/pictures/logoMQL.png" alt="lm" width="150" height="90" id="mini-logo"></div>' +
        '<div class="move-right" onclick="showMenu()"><img src="../../resources/pictures/menu-phone.png" alt="mp" id="menu-button" width="60" height="60"></div>' +
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
    headerContent += '<a href="#footer" class="right"><img class="def-img" src="../../resources/pictures/about.png" alt="about"></a>' +
        '</div>' +
        '</header>';

    /* FOOTER --------------------------------------------------------------------------------------------------------*/
    let footerContent = '<hr><footer>' +
       '        <div class="text-partenaire">\n' +
        '        <img class="right-space" src="../../resources/pictures/icons/partners.png" alt="partners" width="80" height="46"><span>Partenaires</span> \n' +
        '    </div>  <hr>\n' +
        '\n' +
        '    <div class="partenaire">\n' +
        '        <span>\n' +
        '            <a href=""><img class="img-partenaire" src="../../resources/partenaires/capgemeni.png" alt="#"></a>\n' +
        '        </span>\n' +
        '\n' +
        '        <span>\n' +
        '           <a href=""><img class="img-partenaire" src="../../resources/partenaires/umanis.png" alt="#"></a>\n' +
        '        </span>\n' +
        '\n' +
        '        <span>\n' +
        '           <a href=""><img class="img-partenaire" src="../../resources/partenaires/atos.png" alt="#"></a>\n' +
        '        </span>\n' +
        '\n' +
        '        <span>\n' +
        '            <a href=""><img class="img-partenaire" src="../../resources/partenaires/cgi.png" alt="#"></a>\n' +
        '        </span>\n' +
        '    </div>\n' +
        '\n' +
        '    <div class="background-space">\n' +
        '\n' +
        '    </div>\n' +
        '\n' +
        '    <div class="flex-container">\n' +
        '        <div>\n' +
        '            <h5>Lien utiles</h5>\n' +
        '\n' +
        '            <ul>\n' +
        '                <li><a class="links" href="http://www.usmba.ac.ma/">Université Sidi Mohamed Ben Abdellah</a></li>\n' +
        '                <li><a class="links" href="http://www.fsdmfes.ac.ma/">Faculté des sciences DHER EL-MEHRAZ</a></li>\n' +
        '            </ul>\n' +
        '        </div>\n' +
        '\n' +
        '        <div>\n' +
        '            <h5>Localisation</h5>\n' +
        '            <ul class="remove-space">\n' +
        '                <div class="map">\n' +
        '                    <div class="over-flow">\n' +
        '                       <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1653.2037839986274!2d-4.9779526!3d34.0334149!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd9f8b5f7be79403%3A0x64ed183ba63abde7!2sFacult%C3%A9%20des%20Sciences%20Dhar%20El%20Mehraz!5e0!3m2!1sfr!2sma!4v1589646925624!5m2!1sfr!2sma" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0">\n' +
        '                        </iframe>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </ul>\n' +
        '        </div>\n' +
        '\n' +
        '        <div>\n' +
        '            <h5>Contact</h5>\n' +
        '            <ul>\n' +
        '                <li><strong>Coordonnateur :</strong> Noureddine Chenfour</li>\n' +
        '                <li><strong>Adresse :</strong> Département d’Informatique , Faculté des sciences Dhar El Mahraz</li>\n' +
        '                <li><strong>BP.1796, Fès-Atlas, Maroc</strong></li>\n' +
        '                <li><strong>E.mail :</strong> noureddine.chenfour@usmba.ac.ma</li>\n' +
        '            </ul>\n' +
        '        </div>\n' +
        '\n' +
        '    </div>\n' +
        '\n' +
        '    <div class="copy-right">\n' +
        '        <span>\n' +
        '            &copy; 2020 All rights reserved\n' +
        '        </span>\n' +
        '        <span>\n' +
        '            Master Qualité du Logiciel,<a href="#"> Faculté des sciences</a>\n' +
        '        </span>\n' +
        '    </div>        '+
        '</footer>';
    /* ASSIGN DATA ---------------------------------------------------------------------------------------------------*/
    document.getElementById('header').innerHTML = headerContent;
    document.getElementById('footer').innerHTML = footerContent;
    /* CURRENT INITIALIZATION ----------------------------------------------------------------------------------------*/
    let current_element = document.getElementsByName(current_component)[0];
    if(current_component === 'Home') document.getElementById('home-logo').setAttribute('src', '../../resources/pictures/homeactive.png')
    current_element.setAttribute('class', current_element.getAttribute('class') + ' active');
    current_element.setAttribute('onclick', '');
    current_element.setAttribute('onmouseover', '');
    changePicture(current_component);
}

/* Action Functions */
/**
 * Change title image
 * @param element
 * @param animate
 */
function changePicture(element) {
    let image = document.getElementById('title-image');
    let source = element + '.jpg';
    image.setAttribute('src', '../../resources/pictures/' + source);
    image.setAttribute('class', 'def-img');
}

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
/**
 * Building title configuration (icon + show and hide button)
 * @param source
 */
function addTitleIcon(source) {
    let titles = document.getElementsByClassName('title');
    let i=0;
    for (let title of titles) {
        let text = title.textContent;
        title.innerHTML = '<img src="' + source + '" alt="title" class="title-logo">' + text+'<img name="sh-icon" src="../../resources/pictures/icons/minus-icon.png"  class="sh-icon" onclick="hide('+i+')">'+'<span class="sh-sep"></span>';
        i++;
    }
}

/**
 * Action method show details block
 * @param id
 */
function show(id) {
    let icon = document.getElementsByName('sh-icon')[id];
    let sep = document.getElementsByClassName('sh-sep')[id];
    icon.setAttribute('src','../../resources/pictures/icons/minus-icon.png');
    icon.setAttribute('onclick','hide('+id+')');
    let element =document.getElementsByClassName('details')[id];
    element.style.display = 'block';
    sep.style.display='none';
}

/**
 * Action method hide details block
 * @param id
 */
function hide(id) {
    let icon = document.getElementsByName('sh-icon')[id];
    let sep = document.getElementsByClassName('sh-sep')[id];
    icon.setAttribute('src','../../resources/pictures/icons/plus-icon.png');
    icon.setAttribute('onclick','show('+id+')');
    let element = document.getElementsByClassName('details')[id];
    element.style.display = 'none';
    sep.style.display='block';
}

/**
 * Auto-add detection on left-menu bar for auto hovering on target article
 */
function detect_subContent_trigger_left_bar() {
    let element0 = document.getElementsByClassName('left-menu')[0];
    for(let child of element0.childNodes) {
        if(child.innerHTML !== undefined && child instanceof HTMLDivElement) {
            let target = child.firstChild;
            if(target.innerHTML !== undefined) {
                target.setAttribute('id', 'nav' + target.getAttribute('href').substr(target.getAttribute('href').indexOf('#') + 1));
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

/***
 * Lighting with navigation bar (left-menu) instant hovering works with auto detection
 * @param id
 */
function lightNav(id) {
    document.getElementById('nav' + id).classList.add('wrap-red');
}

/***
 * Lighting with navigation bar (left-menu) instant hovering works with auto detection
 * @param id
 */
function offLight(id) {
    document.getElementById('nav' + id).classList.remove('wrap-red');
}

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

/**
 * Close popped image
 */
function closeIMG() {
    let modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

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

/**
 * Global uses for functions bellow
 * @type {number}
 */
let current_img = 1;
let images_size = 0;

/**
 * Create book of images using a base data table
 * @param images
 */
function createBook(images=[]) {
    images_size = images.length;
    let element = document.getElementById('book');
    element.innerHTML = '<div onclick="target(--current_img)" class="arrow-left"><</div>';
    for(let i = 1; i<=images.length; i++) {
        element.innerHTML += '<img class="book_img" src="../../resources/pictures/' + images[i-1] + '" alt="">';
    }
    element.innerHTML += '<div onclick="target(++current_img)" class="arrow-right">></div>';
    document.getElementsByClassName('book_img')[current_img - 1].style.display = 'block';
}

/**
 * Target function for image switching
 */
function target() {
    if(current_img < 1 ) target(++current_img);
    else if(current_img > images_size) target(--current_img);
    else {
        for(let i=0; i<images_size; i++) {
            document.getElementsByClassName('book_img')[i].style.display = 'none';
        }
        document.getElementsByClassName('book_img')[current_img - 1].style.display = 'block';
    }
}




