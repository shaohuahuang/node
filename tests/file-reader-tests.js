var FileReader = require('../utils/file-reader');
var assert = require("assert");

describe('file reader', function () {
    xit('get the list of file names', function (done) {
        this.timeout(10000);
        FileReader.readFileNames(function (files) {
            console.log(files[2]);
            done();
        });
    })
});
