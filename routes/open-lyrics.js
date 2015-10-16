var OpenLyrics = {
    openLyrics: function(req, res, next) {
        OpenLyrics.readLyrics(req.lyricsModel, req.query.code, function (docs) {
            res.send(docs);
            res.end();
        });
    },

    readLyrics: function (model, code, callback) {
        model.find({code: code}, function (err, docs) {
            if(err)
                throw err;
            callback(docs);
        });
    }
}
module.exports = OpenLyrics;