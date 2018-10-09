var mongoose = require('mongoose');
var EducationSchema = new mongoose.Schema({
    userId: String,
    qualification: {
        id: String,
        name: String
    },
    institute: String,
    fromDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Education', EducationSchema, 'Educations');