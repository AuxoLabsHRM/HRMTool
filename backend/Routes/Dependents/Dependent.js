var mongoose = require('mongoose');
var DependentSchema = new mongoose.Schema({
    userId: String,
    name: String,
    relationship: {
        id: String,
        name: String
    },
    dateOfBirth: {
        type: Date
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Dependents', DependentSchema);