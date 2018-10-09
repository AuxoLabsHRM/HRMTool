var mongoose = require('mongoose');
var dashboard = new mongoose.Schema({
    moduleName: String,
    data: {
        type: Object,
        detailName: String,
        controlName: String,
        iconName: String,
        myProjects: String,
        allProjects: String,
        allEmployees: String,
        reports: String
    }
});

module.exports = mongoose.model('Dashboard', dashboard, 'Dashboard');