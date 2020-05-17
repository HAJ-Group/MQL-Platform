function HomeComponentService() { 
    this.db=[];
}

HomeComponentService.prototype.add = function (home) {
    this.db.push(home);
}

HomeComponentService.prototype.get = function (index) {
    return this.db[index];
}

HomeComponentService.prototype.size = function () {
    return this.db.length;
}

HomeComponentService.prototype.load = function(db) {
    for (let i = 0; i < db.length; i++) {
        this.add(
            new Home(
                db[i].id,
                db[i].modules
            )
        )
    }
}
