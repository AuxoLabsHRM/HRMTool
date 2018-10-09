var mongoose = require('mongoose');
var employeeSchema = new mongoose.Schema({
    employeeId: String,
    empFirstName: String,
    empLastName: String,
    empFullName: String,
    empMobile: String,
    empDepartment: String,
    empGender: String,
    empSupervisor: String
});
module.exports = mongoose.model('Employee', employeeSchema, 'Employee');