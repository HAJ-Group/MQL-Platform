/*Global Variables*/
let view;
let service;

/* Main Function */
function main() {
    service = new PartnerComponentService();
    service.load(dbPartner);
    view = new PartnerComponent(service);
    //view.printPartnerList(); Uncomment to print data in table member
    view.printPartners();
    view.hideAll();
    view.trigger();
    view.ajustLinks();
}
