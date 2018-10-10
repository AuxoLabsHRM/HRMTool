var mongoose = require('mongoose')
var applyLeaveSchema = new mongoose.Schema({
    userId: String,
    fromDate:{
        type: Date
    },
    toDate: {
        type: Date
    },
    leaveType: {
        id: String,
        name: String
    },
    note: String,
    days: String,
    status: {
        type: String,
        default: "1"
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('applyleaves', applyLeaveSchema, 'applyLeave');

