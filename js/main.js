function route(component) {
    component += 'Component';
    let url = 'components/' + component + '/' + component + '.html';
    document.getElementById('content').innerHTML = '<iframe src="' + url + '" seamless></iframe>';
}
