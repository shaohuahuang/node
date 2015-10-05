var mongoose = require('mongoose');

var lyricsSchema = new mongoose.Schema({
    code: String,
    language: String,
    title: String,
    content: String,
    date: Date
});

module.exports = mongoose.model('Lyrics', lyricsSchema);
