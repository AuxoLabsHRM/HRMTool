var mongoose = require('mongoose')
var applyleaveSchema = new mongoose.Schema({

    userId: String,
    fromDate:{
        type: Date
    },
    toDate: {
        type: Date
    },
    leavetype: {
        id: String,
        name: String
    },
    note: String,
    leave: String,
    lastModified: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('applyleaves', applyleaveSchema, 'applyleave');

