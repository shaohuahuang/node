var publicMethods = require('../routes/parse-lyrics').LyricsParser;
var privateMethods = require('../routes/parse-lyrics').PrivateMethods;
var assert = require("assert");


describe('lyrics parser', function () {
    it('get code from title, C087 becomes C87', function () {
        var title = '(C087)(2) The Lord Of Glory 荣耀的主 영광의 주.docx';
        assert.equal("C87", privateMethods.getCodeFromTitle(title));
    });

    it('get code from title, B157 becomes B157', function () {
        var title = '(B157) Whenever Or Wherever 不论何时或何处(原或站或坐都想着主)(NEW).doc';
        assert.equal("B157", privateMethods.getCodeFromTitle(title));
    });

    it('test effective chars for eng string', function(){
        var str = '(A48)(2) \
        White Lily Of The Holy Land\n\n\
        1 White lily of the Holy Land,\n\
            your aroma pierces my heart';
        var effectiveCharsArray = privateMethods.getFirstTwentyEffectiveChars(str);
        assert.equal('AWhiteLilyOfTheHolyL',effectiveCharsArray.join(''));
        assert.equal(1, privateMethods.getEnPercent(effectiveCharsArray));
        assert.equal("English",privateMethods.getLang(str));
    });

    it('test effective chars for chinese string', function(){
        var str = '(A48)(2) 圣地中的百合花啊\n\n\
                    1 圣地中的 百合花啊\n\
                    你的香气 扑鼻而来';
        var effectiveCharsArray = privateMethods.getFirstTwentyEffectiveChars(str);
        assert.equal('A圣地中的百合花啊圣地中的百合花啊你的香',effectiveCharsArray.join(''));
        assert.equal(0.95, privateMethods.getChiPercent(effectiveCharsArray));
        assert.equal("Chinese",privateMethods.getLang(str));
    });

    it('test effective chars for korean string', function(){
        var str = '(A48)(2) 성지땅의 백합화야\n\n\
                    1 성지땅에 백합화야\n\
                    네향기가 스며든다 ';
        var effectiveCharsArray = privateMethods.getFirstTwentyEffectiveChars(str);
        assert.equal('A성지땅의백합화야성지땅에백합화야네향기',effectiveCharsArray.join(''));
        assert.equal(0.95, privateMethods.getKorPercent(effectiveCharsArray));
        assert.equal("Korean",privateMethods.getLang(str));
    });

    it('push third lyrics to the sorted array', function(){
        var sortedArray = [];
        var array = [null,null,'A성지땅의백합화야성지땅에백합화야네향기'];
        privateMethods.pushThirdLyricsToSortedArray(array, sortedArray);
        assert.equal(sortedArray[2], 'A성지땅의백합화야성지땅에백합화야네향기');

        sortedArray = [];
        array = [null,null,'A圣地中的百合花啊圣地中的百合花啊你的香'];
        privateMethods.pushThirdLyricsToSortedArray(array, sortedArray);
        assert.equal(sortedArray[1], 'A圣地中的百合花啊圣地中的百合花啊你的香');

        sortedArray = [];
        array = [null,null,'AWhiteLilyOfTheHolyL'];
        privateMethods.pushThirdLyricsToSortedArray(array, sortedArray);
        assert.equal(sortedArray[0], 'AWhiteLilyOfTheHolyL');
    });
});
