/*Global Variables*/
let view;
let service;
/* Main Function */
function main() {
    service = new EventComponentService();
    service.load(dbEvent);
    view = new EventComponent(service);
    //view.printEventList(); Uncomment to print data in table member
    //view.printEventList(); Uncomment to print data in table member
    view.fillNavigation();
    view.fillMain();
    view.fillSwitcher();
    // Stays last
    addTitleIcon('../../resources/pictures/Event-logo.png', true);
    detect_subContent_trigger_left_bar();
}
