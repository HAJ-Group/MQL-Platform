/* ---------------------------------------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------------------------------------*/
/* Models --------------------------------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------------------------------------*/
/**
 * 1
 * @param name
 * @param value
 * @constructor
 */
function Attribute(name, value = '') {
    this.name = name;
    this.value = value;
}
/* ---------------------------------------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------------------------------------*/
/* Models --------------------------------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------------------------------------*/
/* Actions  ------------------------------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------------------------------------*/
/**
 * 1
 * @param element
 * @param content
 */
function loadContent(element, content) {
    if(content instanceof HTMLElement) {
        element.appendChild(content);
    }
    else if(Array.isArray(content)) {
        for(let item of content) {
            loadContent(element, item);
        }
    }
    else element.innerHTML += content;
}
/* ---------------------------------------------------------------------------------------------------------------*/
/**
 * 2
 * @param element
 * @param classes
 */
function loadClasses(element, classes) {
    if(classes.length !== 0) {
        if(Array.isArray(classes)){
            if(classes.length === 1) element.className = classes[0];
            else {
                for(let cls of classes) element.classList.add(cls);
            }
        } else {
            element.className = classes;
        }
    }
}
/* ---------------------------------------------------------------------------------------------------------------*/
/**
 * 3
 * @param element
 * @param attributes
 */
function loadAttributes(element, attributes) {
    for(let attr of attributes) {
        if(attr.name === 'class') {
            loadClasses(element, attr.value);
        }
        else {
            element.setAttribute(attr.name, attr.value);
        }
    }
}
/* ---------------------------------------------------------------------------------------------------------------*/
/** 4
 * build an html element </>
 * @param title
 * @param content
 * @param attributes
 */
function buildElement(title, content, attributes = []) {
    // Creating the dom element
    let element = document.createElement(title);
    // load Content
    if(content !== null) loadContent(element, content);
    // Loading attributes
    if(attributes.length !== 0) loadAttributes(element, attributes);
    return element;
}
/* ---------------------------------------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------------------------------------*/
/* Actions  ------------------------------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------------------------------------*/
/* Specific Actions  ---------------------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------------------------------------*/
/** 1
 * build an html div element <div></div>
 * @param content
 * @param attributes
 * @returns {any}
 */
function buildDIV(content = null, attributes = []) {
    return buildElement('div', content, attributes);
}
/* ---------------------------------------------------------------------------------------------------------------*/
/** 2
 * build an html span element <span></span>
 * @param content
 * @param attributes
 * @returns {any}
 */
function buildSPAN(content = null, attributes = []) {
    return buildElement('span', content, attributes);
}
/* ---------------------------------------------------------------------------------------------------------------*/
/** 3
 * build an html image element <img/>
 * @param src
 * @param alt
 * @param attributes
 * @returns {any}
 */
function buildIMG(src, alt = '', attributes = []) {
    attributes.push(new Attribute('src', src));
    attributes.push(new Attribute('alt', alt));
    return buildElement('img', null, attributes);
}
/* ---------------------------------------------------------------------------------------------------------------*/
/** 4
 * build an html link element <a></a>
 * @param href
 * @param content
 * @param attributes
 * @returns {any}
 */
function buildLINK(href, content = null, attributes = []) {
    attributes.push(new Attribute('href', href));
    return buildElement('a', content, attributes);
}

/**
 * 5
 * @param content
 * @param attributes
 * @returns {any}
 */
function buildParagraph(content = null, attributes = []) {
    return buildElement('p', content, attributes);
}

/**
 * 6
 * @param type
 * @param value
 * @param attributes
 * @param label
 * @param tag
 * @returns {any}
 */
function buildField(type = 'text', value = '', attributes = [], label = null, tag = 'input') {
    let labelElement = null;
    let labelID;
    if(label !== null) {
        for( let attr of attributes ) {
            if(attr.name === 'id') labelID = attr.value;
        }
        labelElement = buildElement('label', label, wrap([{name:'for', value:labelID}]));
    }
    let container = buildDIV(null, attributes);
    if(labelElement !== null) container.appendChild(labelElement);
    attributes.push(new Attribute('type', type));
    attributes.push(new Attribute('value', value));
    container.appendChild(buildElement(tag, null, attributes));
    return container;
}

/**
 * 6
 * @param fields
 * @param content
 * @param attributes
 */
function buildFORM(fields = [], content = null, attributes = []) {
    let form = buildElement('form', content, attributes);
    for(let field of fields) {
        form.appendChild(buildDIV([
            buildElement('label', field.label, cls('form-label', {name:'for', value:field.id})),
            buildElement(field.name, field.content, field.attributes)
        ], cls('form-group')))
    }
}
/* ---------------------------------------------------------------------------------------------------------------*/
/** 7
 * <hr/>
 * @returns {any}
 */
function buildHR(attributes = []) {
    return buildElement('hr', null, attributes);
}
/* ---------------------------------------------------------------------------------------------------------------*/
/** 8
 * <br/>
 * @returns {any}
 */
function buildBR(attributes = []) {
    return buildElement('br', null, attributes)
}
/* ---------------------------------------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------------------------------------*/
/* Quick Methods ------------------------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------------------------------------*/
/** 1
 * Wrapping data into object recommended to use
 * @param attributes
 * @returns {[]}
 */
function wrap(attributes) {
    let ret = [];
    for(let attr of attributes) {
        ret.push(new Attribute(attr.name, attr.value));
    }
    return ret;
}
/* ---------------------------------------------------------------------------------------------------------------*/
/** 2
 * Quick Set of attribute class
 * Format attributes for cls only
 * @param classes
 * @param others
 * @returns {[]}
 */
function cls(classes, others = []) {
    let attributes = [];
    attributes.push(new Attribute('class', classes));
    for(let o of others) {
        attributes.push(new Attribute(o.name, o.value));
    }
    return attributes;
}
/* ---------------------------------------------------------------------------------------------------------------*/
/** 3
 * Quick set of attribute id
 * @param id
 * @param others
 * @returns {[]}
 */
function id(id, others = []) {
    let attributes = [];
    attributes.push(new Attribute('id', id));
    for(let o of others) {
        attributes.push(new Attribute(o.name, o.value));
    }
    return attributes;
}
/* ---------------------------------------------------------------------------------------------------------------*/
/** 3-1
 * @param classes
 * @param id
 * @param others
 * @returns {Array}
 */
function wrapC(classes, others = []) {
    let attributes = [];
    attributes.push(new Attribute('class', classes));
    for(let o of others) {
        attributes.push(new Attribute(o.name, o.value));
    }
    return attributes;
}
/* ---------------------------------------------------------------------------------------------------------------*/
/** 4
 * Quick Set of attributes class, and id
 * @param classes
 * @param id
 * @param others
 * @returns {[]}
 */
function wrapCI(classes, id, others = []) {
    let attributes = [];
    attributes.push(new Attribute('class', classes));
    attributes.push(new Attribute('id', id));
    for(let o of others) {
        attributes.push(new Attribute(o.name, o.value));
    }
    return attributes;
}
/* ---------------------------------------------------------------------------------------------------------------*/
/** 5
 * Quick Set of attributes id, and class
 * @param id
 * @param classes
 * @param others
 * @returns {[]}
 */
function wrapIC(id, classes, others = []) {
    let attributes = [];
    attributes.push(new Attribute('id', id));
    attributes.push(new Attribute('class', classes));
    for(let o of others) {
        attributes.push(new Attribute(o.name, o.value));
    }
    return attributes;
}
/* ---------------------------------------------------------------------------------------------------------------*/
/** 6
 * Quick Set of attributes class, id and name
 * @param classes
 * @param id
 * @param name
 * @param others
 * @returns {[]}
 */
function wrapCIN(classes, id, name, others = []) {
    let attributes = [];
    attributes.push(new Attribute('class', classes));
    attributes.push(new Attribute('id', id));
    attributes.push(new Attribute('name', name));
    for(let o of others) {
        attributes.push(new Attribute(o.name, o.value));
    }
    return attributes;
}
/* ---------------------------------------------------------------------------------------------------------------*/
/** 7
 * Quick Set of attributes id, class, and name
 * @param id
 * @param classes
 * @param name
 * @param others
 * @returns {[]}
 */
function wrapICN(id, classes, name, others = []) {
    let attributes = [];
    attributes.push(new Attribute('id', id));
    attributes.push(new Attribute('class', classes));
    attributes.push(new Attribute('name', name));
    for(let o of others) {
        attributes.push(new Attribute(o.name, o.value));
    }
    return attributes;
}
/* ---------------------------------------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------------------------------------*/
function test() {
    /*document.getElementById('container').innerHTML =
            '<div id="Test-container" class="container d-flex justify-content-center">\n' +
                '<div id="header" class="header">\n' +
                    '<header>this is a header</header>\n' +
                '</div>\n';
                '<hr>\n' +
                '<div id="content" class="content d-block" name="content" onclick="hide()">\n' +
                    '<img src="images/bg.jpg" alt="image" class="main-img">\n' +
                    '<span class="caption">This is an image</span>\n' +
                    '<input type=''
                '</div>\n' +
            '</div>';*/
    document.getElementById('container').appendChild(
        buildDIV([
            buildDIV(
                [
                    buildElement('header', 'this is a header')
                ], wrapIC('header', 'header')
            ),
            buildHR(),
            buildDIV(
                [
                    buildIMG('images/bg.jpg', 'image', cls('main-img')),
                    buildSPAN('This is an image', cls('caption')),
                    buildField('password', '', wrapIC('myID', 'form-group d-flex'), 'Enter password')
                ], wrapICN('content', ['content', 'd-block'], 'content', [{name:'onclick', value:'hide()'}])
            )
        ], wrapIC('Test-container', ['container', 'd-flex', 'justify-content-center']))
    );
}
/* ---------------------------------------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------------------------------------*/
function doc() {
    /** 1
     * Usage of buildElement function with one attribute (onload)
     * <header onload="load()"> loading header </header>
     * let header = buildElement('header', 'loading header', wrap([{name:'onload', value:'load()'}]))
     * 2
     * Usage of buildElement function with multiple attributes (onmouseover onmouseleave id and class)
     * <header id="header" class="header" onmouseover="over()" onmouseleave="leave()"> loading header </header>
     * let header = buildElement('header', 'loading header', wrapIC('header', 'header', [
     *                                                              {name:'onmouseover', value:'over()'},
     *                                                              {name:'onmouseleave', value:'leave()'}
     *                                                            ]);
     * 3
     * Usage of buildDIV function for div creation
     * <div id="container" class="d-fex">This is a div</div>
     * let div = buildDIV('This is a div', wrapIC('container', ['d-flex']));
     */
}
/* ---------------------------------------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------------------------------------*/
// test();
/* ---------------------------------------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------------------------------------*/
