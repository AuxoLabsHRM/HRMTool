var mongoose = require('mongoose')
var applyLeaveSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userId: String,
    fromDate: {
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
    days: Number,
    status: {
        type: String,
        default: "1"
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('applyLeave', applyLeaveSchema);