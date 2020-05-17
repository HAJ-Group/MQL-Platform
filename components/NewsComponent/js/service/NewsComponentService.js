function NewsComponentService() {
    this.data=[];
}
NewsComponentService.prototype.add = function (news) {
    this.data.push(news);
}

NewsComponentService.prototype.get = function (index) {
    return this.data[index];
}

NewsComponentService.prototype.size = function () {
    return this.data.length;
}

NewsComponentService.prototype.load = function(db) {
    for (let i = 0; i < db.length; i++) {
        this.add(
            new News(
                db[i].id,
                db[i].title,
                db[i].date,
                db[i].desciption
            )
        )
    }
}
