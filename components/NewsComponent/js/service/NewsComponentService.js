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

/**
 * Defining search action methode
 * @param title_key
 * @returns {[]}
 */
NewsComponentService.prototype.searchByKey = function(title_key) {
    let ret = [];
    for(let news of this.db) {
        if(news.title.toLowerCase().includes(title_key.toLowerCase())) {
            ret.push(news);
        }
    }
    return ret;
};

NewsComponentService.prototype.load = function(dbSource) {
    for (let i = 0; i < dbSource.length; i++) {
        this.add(
            new News(
                dbSource[i].id,
                dbSource[i].title,
                dbSource[i].date,
                dbSource[i].desciption,
                dbSource[i].images,
            )
        )
    }
};
