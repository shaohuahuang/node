var util = require('../utils/util');
var ParseTitle = {
    getTitlesArray: function(title){
        title = getTitleWithCodeTrimmed(title);
        var indexOfFirstChinese = getIndexOfFirstChinese(title);
        var indexOfFirstKorean = getIndexOfFirstKorean(title);
        var titlesArray = [];
        titlesArray.push(this.getEnglishTitle(title,indexOfFirstChinese,indexOfFirstKorean));
        titlesArray.push(this.getChineseTitle(title,indexOfFirstChinese,indexOfFirstKorean));
        titlesArray.push(this.getKoreanTitle(title,indexOfFirstKorean));
        return titlesArray;
    },
    getEnglishTitle: function(title, indexOfFirstChinese, indexOfFirstKorean){
        if(indexOfFirstChinese<0){
            if(indexOfFirstKorean > -1)
                return title.substr(0, indexOfFirstKorean).trim();
            else
                return title;
        }
        if(indexOfFirstChinese == 0)
            return null;
        var engTitle = title.substr(0, indexOfFirstChinese).trim();
        if(this.isEngTitleValid(engTitle))
            return engTitle;
        return null;
    },
    getChineseTitle: function(title, indexOfFirstChinese, indexOfFirstKorean){
        if(indexOfFirstChinese<0)
            return null;
        if(indexOfFirstKorean < 0)
            return title.substr(indexOfFirstChinese).trim();
        return title.substr(indexOfFirstChinese, indexOfFirstKorean-indexOfFirstChinese).trim();
    },
    getKoreanTitle: function(title, indexOfFirstKorean){
        if(indexOfFirstKorean > -1)
            return title.substr(indexOfFirstKorean).trim();
        return null;
    },
    isEngTitleValid: function (title) {
        for(var i=0;i<title.length;i++){
            if(!util.isInteger(title[i])&&!util.isExcludedChars(title[i]))
                return true;
        }
        return false;
    }
}

function getTitleWithCodeTrimmed(title){
    var indexOfCloseBracket = title.indexOf(')');
    return title.substr(indexOfCloseBracket + 1).trim();
}

function getIndexOfFirstChinese(title){
    for(var i=0; i<title.length; i++){
        if(title.charCodeAt(i)>19000 && title.charCodeAt(i)<41000)
            return i;
    }
    return -1;
}

function getIndexOfFirstKorean(title){
    for(var i=0; i<title.length; i++){
        if(title.charCodeAt(i)>41000)
            return i;
    }
    return -1;
}

module.exports = ParseTitle;