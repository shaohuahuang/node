var assert = require("assert");
var Sync = require("../routes/sync");

var mongoose = require('mongoose');
var Lyrics = require('../models/lyrics');
var dbUrl = process.env.MONGOHQ_URL || 'mongodb://@localhost:27017/dev';
var db = mongoose.connect(dbUrl,{safe: true});

describe('sync module', function() {
    it('1~9 should be integer', function () {
        assert(Sync.isInteger("1"));
        assert(Sync.isInteger("8"));
    });

    it('alphabet and punctuations should be integer', function () {
        assert(!Sync.isInteger("a"));
        assert(!Sync.isInteger("Z"));
        assert(!Sync.isInteger(","));
        assert(!Sync.isInteger("+"));
    });

    it("' ', '\n', ',' ,'!', '(', ')', '~' are exclude chars", function(){
        assert(Sync.isExcludedChars(' '));
        assert(Sync.isExcludedChars('\n'));
        assert(Sync.isExcludedChars(','));
        assert(Sync.isExcludedChars('('));
        assert(Sync.isExcludedChars(')'));
        assert(Sync.isExcludedChars('~'));
    });

    it('test effective chars for eng string', function(){
        var str = '(A48)(2) \
        White Lily Of The Holy Land\n\n\
        1 White lily of the Holy Land,\n\
            your aroma pierces my heart';
        var effectiveCharsArray = Sync.getFirstTwentyEffectiveChars(str);
        assert.equal('AWhiteLilyOfTheHolyL',effectiveCharsArray.join(''));
        assert.equal(1, Sync.getEnPercent(effectiveCharsArray));
        assert.equal("English",Sync.getLang(str));
    });

    it('test effective chars for chinese string', function(){
        var str = '(A48)(2) 圣地中的百合花啊\n\n\
                    1 圣地中的 百合花啊\n\
                    你的香气 扑鼻而来';
        var effectiveCharsArray = Sync.getFirstTwentyEffectiveChars(str);
        assert.equal('A圣地中的百合花啊圣地中的百合花啊你的香',effectiveCharsArray.join(''));
        assert.equal(0.95, Sync.getChiPercent(effectiveCharsArray));
        assert.equal("Chinese",Sync.getLang(str));
    });

    it('test effective chars for korean string', function(){
        var str = '(A48)(2) 성지땅의 백합화야\n\n\
                    1 성지땅에 백합화야\n\
                    네향기가 스며든다 ';
        var effectiveCharsArray = Sync.getFirstTwentyEffectiveChars(str);
        assert.equal('A성지땅의백합화야성지땅에백합화야네향기',effectiveCharsArray.join(''));
        assert.equal(0.95, Sync.getKorPercent(effectiveCharsArray));
        assert.equal("Korean",Sync.getLang(str));
    });
});

describe('db tests in sync module', function () {
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