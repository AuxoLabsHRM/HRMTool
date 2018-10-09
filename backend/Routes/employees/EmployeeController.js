var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var VerifyToken = require(__root + 'Routes/auth/VerifyToken');

router.use(bodyParser.urlencoded({
    extended: true
}));
var Employee = require('./Employee');

// CREATES A NEW USER
router.post('/', function (req, res) {
    Employee.create({
            employeeId: req.body.Id,
            empFirstName: req.body.firstName,
            empLastName: req.body.firstName,
            empFullName: req.body.firstName,
            empMobile: req.body.firstName,
            empDepartment: req.body.firstName,
            empGender: req.body.firstName,
            empSupervisor: req.body.firstName
        },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    Employee.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    Employee.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Employee.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: " + user.name + " was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
router.put('/:id', /* VerifyToken, */ function (req, res) {
    Employee.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});


module.exports = router;