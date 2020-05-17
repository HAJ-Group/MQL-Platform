function NewsComponentService() { 
}
NewsComponentService.prototype.add = function (doc) {
    this.db.push(doc);
}

NewsComponentService.prototype.get = function (index) {
    return this.db[index];
}

NewsComponentService.prototype.size = function () {
    return this.db.length;
}

NewsComponentService.prototype.load = function(db) {
    for (let i = 0; i < db.length; i++) {
        this.db.push(
            new News(
                db[i].id,
                db[i].title,
                db[i].date,
                db[i].desciption
            )
        )
    }
}
