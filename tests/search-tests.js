var assert = require("assert");
var Search = require("../routes/search");

var mongoose = require('mongoose');
var Lyrics = require('../models/lyrics');
var dbUrl = process.env.MONGOHQ_URL || 'mongodb://@localhost:27017/dev';
var db;

if(mongoose.connection.readyState==0){
    db = mongoose.connect(dbUrl,{safe: true});
}

describe('db tests in search module', function () {
    it('test read lyrics by title', function(done){
        Search.readLyrics(Lyrics, "Natural", function (docs) {
            assert.equal("White Lily Of The Natural Temple", docs[0]["title"]);
            done();
        });
    });

    it('test read lyrics by code', function(done){
        Search.readLyrics(Lyrics, "A48", function (docs) {
            assert.equal("White Lily Of The Natural Temple", docs[0]["title"]);
            done();
        });
    });
});