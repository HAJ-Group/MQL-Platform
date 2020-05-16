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
        {name: 'Presentation', content:'Présentation'},
        {name: 'Event', content:'Evénements'},
    ];
    /* HEADER --------------------------------------------------------------------------------------------------------*/
    let headerContent = '<header class="div-center">' +
        '<img class="animate_title" id="title-image" src="" alt="title" />' +
        '<div class="topnav">\n' +
        '<a href="#home" class="left" onclick="route(' + '\'../Home\'' + ')" onmouseover="changePicture(this.name)" onmouseleave="changePicture(current_component, false)" ' +
        'name="Home" href="#Home"><img id="home-logo" src="../../resources/pictures/home.png" alt="home"></a>\n';
    // DYNAMIC NAVS
    for(let nav of navs) {
        headerContent += '<a href="#' + nav.name +
            '" class="left" onclick="route(\'../' + nav.name + '\')"' +
            ' onmouseover="changePicture(this.name)" ' +
            'onmouseleave="changePicture(current_component,false)" ' +
            'name="' + nav.name + '">' + nav.content + '</a>\n'
    }
    //
    headerContent += '<a href="#about" class="right"><img src="../../resources/pictures/about.png" alt="about"></a>' +
        '</div>' +
        '</header><hr>';

    /* FOOTER --------------------------------------------------------------------------------------------------------*/
    let footerContent = '<footer>' +
        'footer' +
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

