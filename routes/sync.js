var unoconv = require('unoconv');
var _ = require('underscore');

var Sync = {
    sync : function (req, res, next) {
        unoconv.convert('../docx/(A048) White Lily Of The Natural Temple 圣地中的百合花啊 성지땅의 백합화야.doc','txt', function (err, result) {
            if(err)
                return next(err);

            res.write("It starts to sync\n");
            var lyrics = result.toString();
            var codeWithBracket = "(A48)";
            var firstIndex = getFirstIndexOfLyricCode(lyrics, codeWithBracket);
            var secondIndex = getSecondIndexOfLyricsCode(lyrics, codeWithBracket, firstIndex);
            //TODO: thirdIndex might be -1, will handle later
            var thirdIndex = getThirdIndexOfLyricsCode(lyrics, codeWithBracket, secondIndex);

            var firstLyrics = lyrics.substr(firstIndex, secondIndex-firstIndex);
            var secondLyrics = lyrics.substr(secondIndex, thirdIndex-secondIndex);
            var thirdLyrics = lyrics.substr(thirdIndex);

            var langOfFirstLyrics = this.getLang(firstLyrics);

            console.info('first: ', firstLyrics);
            console.info('second: ', secondLyrics);
            console.info('third:', thirdLyrics);
        });
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



