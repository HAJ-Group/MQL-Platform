let current_component;

function route(component) {
    let path;
    if (component.indexOf('../') === 0) {
        component = component.substring(3);
        path = '../../'
    }
    else path = '';
    component += 'Component';
    window.location.href = path + 'components/' + component + '/' + component + '.html';
}


function loadResources() {
    let headerContent = '<header class="div-center">' +
        '<img class="animate_title" id="title-image" src="" alt="title" />' +
        '<div class="topnav">\n' +
        '<a class="active left" class="left" onmouseover="changePicture(this.name)" onmouseleave="changePicture(current_component, false)" name="Home" href="#home"><img src="../../resources/pictures/home.png" alt="home"></a>\n' +
        '<a href="#presentation" class="left" onmouseover="changePicture(this.name)" onmouseleave="changePicture(current_component, false)" name="Presentation">Présentation</a>\n' +
        '<a href="#events" class="left" onmouseover="changePicture(this.name)" onmouseleave="changePicture(current_component, false)" name="Event">Evénements</a>\n' +
        '<a href="#nav3" class="left">Nav3</a>\n' +
        '<a href="#nav3" class="left">Nav4</a>\n' +
        '<a href="#nav3" class="left">Nav5</a>\n' +
        '<a href="#contact" class="left">Contact</a>\n' +
        '<a href="#about" class="right"><img src="../../resources/pictures/about.png" alt="about"></a>' +
        '</div>' +
        '</header><hr>';
    let footerContent = '<footer>' +
        'footer' +
        '</footer>';
    document.getElementById('header').innerHTML = headerContent;
    document.getElementById('footer').innerHTML = footerContent;
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

