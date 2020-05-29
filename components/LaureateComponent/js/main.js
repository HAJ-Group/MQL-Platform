/*Global Variables*/
let view;
let service;

/* Main Function */
function main() {
    service = new LaureateComponentService();
    service.loadPromotion(dbPromotion);
    view = new LaureateComponent(service);
    view.fillNavigation();
    view.fillRecomondation();
    view.fillMain();
    view.fillSwitcher();
    // stays last
    addTitleIcon('../../resources/pictures/laureate-logo.png', true);
    detect_subContent_trigger_left_bar();
}
