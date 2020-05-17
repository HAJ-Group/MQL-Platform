function HomeComponentService() { 
    this.db=[];
}

HomeComponentService.prototype.add = function (doc) {
    this.db.push(doc);
}

HomeComponentService.prototype.get = function (index) {
    return this.db[index];
}

HomeComponentService.prototype.size = function () {
    return this.db.length;
}

HomeComponentService.prototype.load = function(db) {
    for (let i = 0; i < db.length; i++) {
        this.db.push(
            new Home(
                db[i].id,
                db[i].modules
            )
        )
    }
}
