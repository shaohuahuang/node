var request = require('request');

var Login = {
    authenticate: function (req, res, next) {
        var url = 'http://heavensbride.org/Sources/internal_portal_auth.php?'
            + 'test1=19781978' +
            "&uid=" + req.query.uid +
            "&time=" + req.query.time +
            "&pw=" + req.query.pw;
        request(url, function (err, response, body) {
            res.write(body);
            res.end();
        });
    }
}

module.exports = Login;
