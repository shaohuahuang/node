var Search = {
    search: function(req, res, next) {
        Search.readLyrics(req.lyricsModel, req.query.searchText, function (docs) {
            res.send(docs);
            res.end();
        });
    },

    readLyrics: function (model, searchText, callback) {
        var query = {};
        if(searchText) {
            var regExp = new RegExp(searchText, 'i');
            query = {"$or": [{code: regExp}, {title: regExp}]};
        }
        model.find(query, function (err, docs) {
            if(err)
                throw err;
            callback(docs);
        });
    }
}
module.exports = Search;