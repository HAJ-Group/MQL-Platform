/*Global Variables*/
let view;
let service;
/* Main Function */
function main() {
    service = new HomeComponentService();
    service.load(dbHomeProgram);
    view = new HomeComponent(service);
//	view.printSemesters();
    view.printNews();
    view.setNewsRoutes();

    // stays last
    addTitleIcon('../../resources/pictures/title-logo.png');
    detect_subContent_trigger_left_bar();
    createBook(dbHomeImages);
}
