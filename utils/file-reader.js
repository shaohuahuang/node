var fs = require('fs');

var FileReader = (function(){
    var dirPath = '/home/air/box/Hope Music MP3, Lyrics, Index/lyrics/3-in-1 lyrics/';
    //var dirPath = '/home/air/dev/nodegit/docx';
    function readFileNames(callback){
        fs.readdir(dirPath, function (err, files) {
            if(err)
                throw err;
            callback(files);
        });
    }

    return {
        readFileNames: readFileNames
    }
})();

module.exports = FileReader;