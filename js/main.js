function route(component) {
    component += 'Component';
    let url = 'components/' + component + '/' + component + '.html';
    document.body.innerHTML = '<iframe src="' + url + '" seamless></iframe>';
}
