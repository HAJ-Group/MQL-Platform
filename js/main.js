function route(component, element='content') {
    component += 'Component';
    let url = 'components/' + component + '/' + component + '.html';
    document.getElementById(element).setAttribute('w3-include-html', url);
    w3IncludeHTML();
}
