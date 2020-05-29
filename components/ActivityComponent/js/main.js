/*Global Variables*/
let view;
let service;
/* main function */
function main() {
    service = new ActivityComponentService();
    service.load(dbActivity);
    view = new ActivityComponent(service);
    view.printSemesters();
    collapse();
    addTitleIcon('../../resources/pictures/Activity-logo.png');
    //view.printActivityList(); Uncomment to print data in table member
}
