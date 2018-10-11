var mongoose = require('mongoose')
var availableLeaveSchema = new mongoose.Schema({
    userId: String,
    sickLeave:{
        type: Number,
        default: 0
    },
    casualLeave: {
        type: Number,
        default: 0
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('availableLeaves', availableLeaveSchema, 'AvailableLeave');

