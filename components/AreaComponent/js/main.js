/*Global Variables*/
let view;
let service;
/* Main Function */
function main() {
    service = new AreaComponentService();
    service.load(dbArea);
    view = new AreaComponent(service);
    //view.printAreaList(); Uncomment to print data in table member
    if(localStorage.getItem('ACCESS') !== 'null'){
        view.loadData();
    } else view.promptLogin();
}
