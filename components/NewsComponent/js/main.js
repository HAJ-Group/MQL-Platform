/*Global Variables*/
let view;
let service;

/* Main Function */
function main() {
    service = new NewsComponentService();
    service.load(dbNews);
    view = new NewsComponent(service);
    //view.printNewsList();
    view.fillNavigation();
    view.fillMain();
    view.fillSwitcher();
    // stays last
    addTitleIcon('../../resources/pictures/News-logo.png', true);
    detect_subContent_trigger_left_bar();
    view.trigger();
}

