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
