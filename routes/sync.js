var unoconv = require('unoconv');
var _ = require('underscore');
var ParseTitle = require('./parse-title');
var FileReader = require('../utils/file-reader');
var async = require('async');
var LyricsParser = require('./parse-lyrics').LyricsParser;


var Sync = {
    syncAllFiles: function (req, res, next) {
        var lyricsDirPath = '/home/air/box/Hope Music MP3, Lyrics, Index/lyrics/3-in-1 lyrics/';
        FileReader.readFileNames(function (files) {
            var asyncTasks = [];
            files.forEach(function(file, index){
                asyncTasks.push(function (callback) {
                    console.log(file);
                    console.log("Current Index: "+index);
                    Sync.syncSingleFile(lyricsDirPath, file, req.lyricsModel, callback);
                });
            });
            console.info("tasks length: ", asyncTasks.length);
            async.series(asyncTasks, function(){
                console.log("tasks is done");
            });
        });
        res.write("start sync ...");
        return next();
    },
    //'../docx/(A048) White Lily Of The Natural Temple 圣地中的百合花啊 성지땅의 백합화야.doc'
    syncSingleFile : function (lyricsDirPath, fileName, model, callback) {
        var filePath = lyricsDirPath + fileName;
        unoconv.convert(filePath,'txt', function (err, result) {
            if(err){
                console.info("err------------------", err.message);
                return;
            }
            var title = fileName.split(".")[0];
            var lyrics = result.toString();
            var code = LyricsParser.getCodeFromTitle(title);
            var codeWithBracket = "(" + code + ")";
            var lyricsArray = LyricsParser.getSortedLyricsArray(codeWithBracket, lyrics);
            var titlesArray = ParseTitle.getTitlesArray(title);

            if(lyricsArray[0]){
                var engLyrics = lyricsArray[0];
                var engTitle = titlesArray[0];
                Sync.upsertLyrics(
                    {code: code, language: "English"},
                    {code: code, language: "English", title: engTitle, content: engLyrics, date: new Date()},
                    model
                );
            }

            if(lyricsArray[1]){
                var chiLyrics = lyricsArray[1];
                var chiTitle = titlesArray[1];
                Sync.upsertLyrics(
                    {code: code, language: "Chinese"},
                    {code: code, language: "Chinese", title: chiTitle, content: chiLyrics, date: new Date()},
                    model
                );
            }

            if(lyricsArray[2]){
                var korLyrics = lyricsArray[2];
                var korTitle = titlesArray[2];
                Sync.upsertLyrics(
                    {code: code, language: "Korean"},
                    {code: code, language: "Korean", title: korTitle, content: korLyrics, date: new Date()},
                    model
                );
            }
            callback();
        });
    },

    upsertLyrics: function (query, data, model, callback) {
        model.findOneAndUpdate(query, data, {upsert: true}, function (err, doc) {
            if(callback)
                callback(doc);
        });
    },

}

module.exports = Sync;



