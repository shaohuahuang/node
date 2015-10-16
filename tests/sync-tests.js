var assert = require("assert");
var Sync = require("../routes/sync");

var mongoose = require('mongoose');
var Lyrics = require('../models/lyrics');
var dbUrl = process.env.MONGOHQ_URL || 'mongodb://@localhost:27017/dev';
var db;

if(mongoose.connection.readyState==0){
    db = mongoose.connect(dbUrl,{safe: true});
}

describe('db tests in syncSingleFile module', function () {
    it('test upsert lyrics', function (done) {
        Sync.upsertLyrics(
            {code: "A00", language: "English"},
            {code: "A00", language: "English", title: "test title", content: "test content", date: new Date()},
            Lyrics,
            function callback(doc){
                done();
            }
        );

        Lyrics.findOneAndRemove({code: "A00", language: "English"}, function (doc) {
            assert.equal("test title", doc.title);
            assert.equal("test content", doc.content);
            done();
        });
    });
});