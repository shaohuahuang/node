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
        if(indexOfFirstChinese<0)
            return title.substr(0, indexOfFirstKorean).trim();
        if(indexOfFirstChinese == 0)
            return null;
        return title.substr(0, indexOfFirstChinese).trim();
    },
    getChineseTitle: function(title, indexOfFirstChinese, indexOfFirstKorean){
        if(indexOfFirstChinese<0)
            return null;
        return title.substr(indexOfFirstChinese, indexOfFirstKorean-indexOfFirstChinese).trim();
    },
    getKoreanTitle: function(title, indexOfFirstKorean){
        return title.substr(indexOfFirstKorean).trim();
    },
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
}

module.exports = ParseTitle;