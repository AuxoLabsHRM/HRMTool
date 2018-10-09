var mongoose = require('mongoose');
var LanguageSchema = new mongoose.Schema({
    userId: String,
    language: {
        id: String,
        name: String
    },
    reading: {
        type: Boolean,
        default: false
    },
    speaking: {
        type: Boolean,
        default: false
    },
    writing: {
        type: Boolean,
        default: false
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Languages', LanguageSchema);