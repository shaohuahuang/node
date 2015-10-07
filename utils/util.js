var _ = require('underscore');

var util = {
    isExcludedChars: function(char) {
        var excludedChars = [' ', '\n', ',' ,'!', '(', ')', '~'];
        return _.contains(excludedChars, char);
    },
    isInteger: function(char){
        return char.charCodeAt(0)>="0".charCodeAt(0) && char.charCodeAt(0)<="9".charCodeAt(0);
    },
}

module.exports = util;