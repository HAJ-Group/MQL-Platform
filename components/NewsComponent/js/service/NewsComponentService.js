function NewsComponentService() {
    this.db = [];
}
NewsComponentService.prototype.add = function (news) {
    this.db.push(news);
};

NewsComponentService.prototype.remove = function(index) {
    this.db.splice(index, 1);
};

NewsComponentService.prototype.get = function (index) {
    return this.db[index];
};

NewsComponentService.prototype.size = function () {
    return this.db.length;
};

NewsComponentService.prototype.load = function(dbSource) {
    for (let i = 0; i < dbSource.length; i++) {
        this.add(
            new News(
                dbSource[i].id,
                dbSource[i].title,
                dbSource[i].date,
                dbSource[i].desciption
            )
        )
    }
};
