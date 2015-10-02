var assert = require("assert");
var ParseTitle = require('../routes/parse-title');
describe('parse title module', function() {
    it('get titles of different lang from lyric code', function () {
        var title = '(A048) White Lily Of The Natural Temple 圣地中的百合花啊 성지땅의 백합화야';
        var titlesArray = ParseTitle.getTitlesArray(title);
        assert.equal('White Lily Of The Natural Temple', titlesArray[0]);
        assert.equal('圣地中的百合花啊', titlesArray[1]);
        assert.equal('성지땅의 백합화야', titlesArray[2]);
    });

    it('get titles of different lang from lyric code with no eng', function () {
        var title = '(A048) 圣地中的百合花啊 성지땅의 백합화야';
        var titlesArray = ParseTitle.getTitlesArray(title);
        assert.equal(null, titlesArray[0]);
        assert.equal('圣地中的百合花啊', titlesArray[1]);
        assert.equal('성지땅의 백합화야', titlesArray[2]);
    });

    it('get titles of different lang from lyric code with no chinese', function () {
        var title = '(A048) White Lily Of The Natural Temple 성지땅의 백합화야';
        var titlesArray = ParseTitle.getTitlesArray(title);
        assert.equal('White Lily Of The Natural Temple', titlesArray[0]);
        assert.equal(null, titlesArray[1]);
        assert.equal('성지땅의 백합화야', titlesArray[2]);
    });
});