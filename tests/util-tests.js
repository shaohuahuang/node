/**
 * Created by air on 07/10/15.
 */
var util = require('../utils/util');
var assert = require("assert");

describe('util module', function () {
    it('1~9 should be integer', function () {
        assert(util.isInteger("1"));
        assert(util.isInteger("8"));
    });

    it('alphabet and punctuations should be integer', function () {
        assert(!util.isInteger("a"));
        assert(!util.isInteger("Z"));
        assert(!util.isInteger(","));
        assert(!util.isInteger("+"));
    });

    it("' ', '\n', ',' ,'!', '(', ')', '~' are exclude chars", function(){
        assert(util.isExcludedChars(' '));
        assert(util.isExcludedChars('\n'));
        assert(util.isExcludedChars(','));
        assert(util.isExcludedChars('('));
        assert(util.isExcludedChars(')'));
        assert(util.isExcludedChars('~'));
    });
});