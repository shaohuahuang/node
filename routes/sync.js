var unoconv = require('unoconv');
var _ = require('underscore');
var ParseTitle = require('./parse-title');

var Sync = {
    sync : function (req, res, next) {
        unoconv.convert('../docx/(A048) White Lily Of The Natural Temple 圣地中的百合花啊 성지땅의 백합화야.doc','txt', function (err, result) {
            if(err)
                return next(err);
            res.write("It starts to sync\n");

            var title = '(A048) White Lily Of The Natural Temple 圣地中的百合花啊 성지땅의 백합화야';
            var lyrics = result.toString();
            var codeWithBracket = "(A48)";
            var lyricsArray = Sync.getSortedLyricsArray(codeWithBracket, lyrics);
            var titlesArray = ParseTitle.getTitlesArray(title);

            var engLyrics = lyricsArray[0];
            var engTitle = titlesArray[0];
            console.info("english lyrics", engLyrics);
            console.info("english title", engTitle);

            Sync.upsertLyrics(
                {code: "A48", language: "English"},
                {code: "A48", language: "English", title: engTitle, content: engLyrics, date: new Date()},
                req.lyricsModel
            );

            console.info("english", lyricsArray[0]);
            console.info("chinese", lyricsArray[1]);
            console.info("korean", lyricsArray[2]);
        });
    },

    upsertLyrics: function (query, data, model, callback) {
        model.findOneAndUpdate(query, data, {upsert: true}, function (err, doc) {
            if(callback)
                callback(doc);
        });
    },

    getSortedLyricsArray: function (codeWithBracket, lyrics) {
        var array =  getLyricsArray(codeWithBracket, lyrics);
        var sortedArray = [null,null,null];

        var langOfFirstLyric = this.getLang(array[0]);
        if(langOfFirstLyric == "English")
            sortedArray[0] = array[0];
        else if(langOfFirstLyric == "Chinese")
            sortedArray[1] = array[0];
        else
            sortedArray[2] = array[0];

        var langOfSecondLyric = this.getLang(array[1]);
        if(langOfSecondLyric == "English")
            sortedArray[0] = array[1];
        else if(langOfSecondLyric == "Chinese")
            sortedArray[1] = array[1];
        else
            sortedArray[2] = array[1];

        if(array[2]){
            var langOfThirdLyric = this.getLang(array[2]);
            if(langOfThirdLyric == "English")
                sortedArray[0] = array[2];
            else if(langOfThirdLyric == "Chinese")
                sortedArray[1] = array[2];
            else
                sortedArray[2] = array[2];
        }
        return sortedArray;
    },

    getLang: function(lyrics){
        var effectiveCharsArray = this.getFirstTwentyEffectiveChars(lyrics);
        var engPercent = this.getEnPercent(effectiveCharsArray);
        var chiPercent = this.getChiPercent(effectiveCharsArray);
        var korPercent = this.getKorPercent(effectiveCharsArray);
        return getLangByPercent(engPercent,chiPercent,korPercent);
    },

    getFirstTwentyEffectiveChars: function(lyrics){
        var count = 0;
        var index = 0;
        var char;
        var effectiveChars = [];
        while(count<20){
            char = lyrics[index];
            if(!this.isInteger(char)&&!this.isExcludedChars(char)){
                count++;
                effectiveChars.push(char);
            }
            index++;
        }
        return effectiveChars;
    },

    isExcludedChars : function (char) {
        var excludedChars = [' ', '\n', ',' ,'!', '(', ')', '~'];
        return _.contains(excludedChars, char);
    },

    isInteger : function(char){
        return char.charCodeAt(0)>="0".charCodeAt(0) && char.charCodeAt(0)<="9".charCodeAt(0);
    },

    getEnPercent: function(effectiveCharsArray){
        var engCharCount = _.filter(effectiveCharsArray, function(char){
            return char>='A' && char<='z'
        }).length;
        return engCharCount/20;
    },

    getChiPercent: function(effectiveCharsArray){
        var engCharCount = _.filter(effectiveCharsArray, function(char){
            return char.charCodeAt(0) > 19000 && char.charCodeAt(0) < 41000;
        }).length;
        return engCharCount/20;
    },

    getKorPercent: function(effectiveCharsArray){
        var korCharCount = _.filter(effectiveCharsArray, function(char){
            return char.charCodeAt(0) > 41000;
        }).length;
        return korCharCount/20;
    },
}

function getLyricsArray(codeWithBracket, lyrics) {
    var firstIndex = getFirstIndexOfLyricCode(lyrics, codeWithBracket);
    var secondIndex = getSecondIndexOfLyricsCode(lyrics, codeWithBracket, firstIndex);
    var thirdIndex = getThirdIndexOfLyricsCode(lyrics, codeWithBracket, secondIndex);
    var array = [];
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

function getLangByPercent(engPercent, chiPercent, korPercent){
    if(engPercent > chiPercent && engPercent > korPercent)
        return "English";
    if(chiPercent > engPercent && chiPercent > korPercent)
        return "Chinese";
    return "Korean";
}

module.exports = Sync;



