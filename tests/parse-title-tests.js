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

    it('get titles of different lang special case 1', function () {
        var title = '(C111) 主已来临新历史中 주님 오신 새역사 NEW(確認)';
        var titlesArray = ParseTitle.getTitlesArray(title);
        assert.equal(null, titlesArray[0]);
        assert.equal('主已来临新历史中', titlesArray[1]);
        assert.equal('주님 오신 새역사 NEW(確認)', titlesArray[2]);
    });

    it('get titles of different lang special case 2', function () {
        var title = '(C093) As I Traveled The Course Of My Life 走过我的人生旅途中[暂译] (原 因着爱) 나의 인생 가는 동안에';
        var titlesArray = ParseTitle.getTitlesArray(title);
        assert.equal('As I Traveled The Course Of My Life', titlesArray[0]);
        assert.equal('走过我的人生旅途中[暂译] (原 因着爱)', titlesArray[1]);
        assert.equal('나의 인생 가는 동안에', titlesArray[2]);
    });

    it('get titles of different lang special case 3', function () {
        var title = '(C089) Raise Me Up';
        var titlesArray = ParseTitle.getTitlesArray(title);
        assert.equal('Raise Me Up', titlesArray[0]);
        assert.equal(null, titlesArray[1]);
        assert.equal(null, titlesArray[2]);
    });

    it('get titles of different lang special case 4', function () {
        var title = '(C087)(2) 荣耀的主 영광의 주';
        var titlesArray = ParseTitle.getTitlesArray(title);
        assert.equal(null, titlesArray[0]);
        assert.equal('荣耀的主', titlesArray[1]);
        assert.equal('영광의 주', titlesArray[2]);
    });

    it('get titles of different lang special case 5', function () {
        var title = '(C012) With the Lord Forever 与主直到永远 주님과 영원토록 (2)';
        var titlesArray = ParseTitle.getTitlesArray(title);
        assert.equal('With the Lord Forever', titlesArray[0]);
        assert.equal('与主直到永远', titlesArray[1]);
        assert.equal('주님과 영원토록 (2)', titlesArray[2]);
    });

    it('get titles of different lang special case 6', function () {
        var title = '(B174) When The Sun Rises Over The Hill 旭日在山丘升起时 아침에 동산 해 뜨면 (old We are one 우리는 하나)';
        var titlesArray = ParseTitle.getTitlesArray(title);
        assert.equal('When The Sun Rises Over The Hill', titlesArray[0]);
        assert.equal('旭日在山丘升起时', titlesArray[1]);
        assert.equal('아침에 동산 해 뜨면 (old We are one 우리는 하나)', titlesArray[2]);
    });

    it('get titles of different lang special case 7', function () {
        var title = '(B157) Whenever Or Wherever 不论何时或何处(原或站或坐都想着主)(NEW)';
        var titlesArray = ParseTitle.getTitlesArray(title);
        assert.equal('Whenever Or Wherever', titlesArray[0]);
        assert.equal('不论何时或何处(原或站或坐都想着主)(NEW)', titlesArray[1]);
        //assert.equal(null, titlesArray[2]);
    });

    it('check whether eng title is valid.', function () {
        assert.equal(false, ParseTitle.isEngTitleValid((2)));
    });
});