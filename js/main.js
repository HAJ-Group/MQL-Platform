let current_component;

function route(component, tag_id=null) {
    if(component !== null) {
        let path;
        if (component.indexOf('../') === 0) {
            component = component.substring(3);
            path = '../../'
        }
        else path = '';
        component += 'Component';
        if(tag_id !== null){
            window.location.href = path + 'components/' + component + '/' + component + '.html' + '#' + tag_id;
        } else
            window.location.href = path + 'components/' + component + '/' + component + '.html';
    }
}


function loadResources() {
    let navs = [
        /*
        * name : value of name attribute related with the title picture and the component
        * content : value of the innerText of the nav
        * */
        {name: 'Home', content:'<img id="home-logo" src="../../resources/pictures/home.png" alt="home">'},
        {name: 'Presentation', content:'Présentation'},
        {name: 'Event', content:'Evénements'},
    ];
    /* HEADER --------------------------------------------------------------------------------------------------------*/
    let headerContent = '<header class="div-center">' +
        '<img class="animate_title" id="title-image" src="" alt="title" />' +
        '<div class="topnav">\n';
    // DYNAMIC NAVS
    for(let nav of navs) {
        headerContent += '<a href="#' + nav.name +
            '" class="left" onclick="route(\'../' + nav.name + '\')"' +
            ' onmouseover="changePicture(this.name)" ' +
            'onmouseleave="changePicture(current_component,false)" ' +
            'name="' + nav.name + '">' + nav.content + '</a>\n'
    }
    // ABOUT NAV
    headerContent += '<a href="#about" class="right"><img src="../../resources/pictures/about.png" alt="about"></a>' +
        '</div>' +
        '</header><hr>';

    /* FOOTER --------------------------------------------------------------------------------------------------------*/
    let footerContent = '<footer>' +
       '        <div class="text-partenaire">\n' +
        '        <span>Partenaires</span>\n' +
        '    </div>\n' +
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
        '            <ul>\n' +
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
function changePicture(element, animate=true) {
    let image = document.getElementById('title-image');
    let source = element + '.jpg';
    image.setAttribute('src', '../../resources/pictures/' + source);
    if (animate === true) {
        image.classList.remove('animate_title');
        void image.offsetWidth;
        image.classList.add('animate_title');
    }
}



