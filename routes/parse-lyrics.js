var _ = require('underscore');
var util = require('../utils/util');
var LyricsParser = (function () {
    function getCodeFromTitle(title){
        var index1 = title.indexOf('(');
        var index2 = title.indexOf(')');
        var code = title.substr(index1+1,index2-index1-1);
        if(code[1] === "0")
            code = code[0] + code.substr(2);
        return code;
    }

    function getLangByPercent(engPercent, chiPercent, korPercent){
        if(engPercent > chiPercent && engPercent > korPercent)
            return "English";
        if(chiPercent > engPercent && chiPercent > korPercent)
            return "Chinese";
        return "Korean";
    }

    function getSortedLyricsArray(codeWithBracket, lyrics) {
        var array =  getLyricsArray(codeWithBracket, lyrics);
        var sortedArray = [null,null,null];

        var langOfFirstLyric = getLang(array[0]);
        if(langOfFirstLyric == "English")
            sortedArray[0] = array[0];
        else if(langOfFirstLyric == "Chinese")
            sortedArray[1] = array[0];
        else
            sortedArray[2] = array[0];

        pushSecondLyricsToSortedArray(array, sortedArray);
        pushThirdLyricsToSortedArray(array, sortedArray);
        return sortedArray;
    }

    return {
        publicMethods: {
            getCodeFromTitle: getCodeFromTitle,
            getLangByPercent : getLangByPercent,
            getSortedLyricsArray: getSortedLyricsArray
        },

        privateMethods:{
            getCodeFromTitle: getCodeFromTitle,
            getFirstTwentyEffectiveChars: getFirstTwentyEffectiveChars,
            getEnPercent: getEnPercent,
            getChiPercent: getChiPercent,
            getKorPercent: getKorPercent,
            getLang : getLang,
            pushThirdLyricsToSortedArray: pushThirdLyricsToSortedArray
        }
    };


    /////////////////////////////////////////private functions
    function getLang(lyrics){
        var effectiveCharsArray = getFirstTwentyEffectiveChars(lyrics);
        var engPercent = getEnPercent(effectiveCharsArray);
        var chiPercent = getChiPercent(effectiveCharsArray);
        var korPercent = getKorPercent(effectiveCharsArray);
        return getLangByPercent(engPercent,chiPercent,korPercent);
    }

    function pushThirdLyricsToSortedArray(array, sortedArray) {
        if (array[2]) {
            var langOfThirdLyric = getLang(array[2]);
            if (langOfThirdLyric == "English")
                sortedArray[0] = array[2];
            else if (langOfThirdLyric == "Chinese")
                sortedArray[1] = array[2];
            else
                sortedArray[2] = array[2];
        }
    }

    function pushSecondLyricsToSortedArray(array, sortedArray) {
        if (array[1]) {
            var langOfSecondLyric = getLang(array[1]);
            if (langOfSecondLyric == "English")
                sortedArray[0] = array[1];
            else if (langOfSecondLyric == "Chinese")
                sortedArray[1] = array[1];
            else
                sortedArray[2] = array[1];
        }
    }

    function getLyricsArray(codeWithBracket, lyrics) {
        var firstIndex = getFirstIndexOfLyricCode(lyrics, codeWithBracket);
        var secondIndex = getSecondIndexOfLyricsCode(lyrics, codeWithBracket, firstIndex);
        var thirdIndex = getThirdIndexOfLyricsCode(lyrics, codeWithBracket, secondIndex);
        var array = [];

        if(secondIndex == -1){
            array.push(lyrics);
            array.push(null);
            array.push(null);
            return array;
        }

        if(thirdIndex>-1){
            array.push(lyrics.substr(firstIndex, secondIndex-firstIndex));
            array.push(lyrics.substr(secondIndex, thirdIndex-secondIndex));
            array.push(lyrics.substr(thirdIndex));
        }else{
            array.push(lyrics.substr(firstIndex, secondIndex-firstIndex));
            array.push(lyrics.substr(secondIndex));
            array.push(null);
        }
        return array;
    }

    function getFirstIndexOfLyricCode(lyrics, codeWithBracket){
        return lyrics.indexOf(codeWithBracket);
    }

    function getSecondIndexOfLyricsCode(lyrics, codeWithBracket, firstIndex){
        return lyrics.indexOf(codeWithBracket, firstIndex+1);
    }

    function getThirdIndexOfLyricsCode(lyrics, codeWithBracket, secondIndex){
        return lyrics.indexOf(codeWithBracket, secondIndex+1);
    }

    function getEnPercent(effectiveCharsArray){
        var engCharCount = _.filter(effectiveCharsArray, function(char){
            return char>='A' && char<='z'
        }).length;
        return engCharCount/20;
    }

    function getChiPercent(effectiveCharsArray){
        var engCharCount = _.filter(effectiveCharsArray, function(char){
            return char.charCodeAt(0) > 19000 && char.charCodeAt(0) < 41000;
        }).length;
        return engCharCount/20;
    }

    function getKorPercent(effectiveCharsArray) {
        var korCharCount = _.filter(effectiveCharsArray, function (char) {
            return char.charCodeAt(0) > 41000;
        }).length;
        return korCharCount / 20;
    }

    function getFirstTwentyEffectiveChars(lyrics){
        var count = 0;
        var index = 0;
        var char;
        var effectiveChars = [];
        while(count<20){
            char = lyrics[index];
            if(!util.isInteger(char)&&!util.isExcludedChars(char)){
                count++;
                effectiveChars.push(char);
            }
            index++;
        }
        return effectiveChars;
    }
})();

module.exports.LyricsParser = LyricsParser.publicMethods;
module.exports.PrivateMethods = LyricsParser.privateMethods;