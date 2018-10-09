var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var VerifyToken = require(__root + 'Routes/auth/VerifyToken');
const mongojs = require('mongojs');
// var databaseUrl = "mongodbadmin:Mongouseradmin123@96.84.49.10:17818/cryptocurrency"; // "username:password@example.com/mydb"
var databaseUrl = "mongodb://localhost:27017/issues";
var collections = ['dashboards', 'users'];
var db = mongojs(databaseUrl, collections);
const JSON = require('circular-json');
router.use(bodyParser.json());

router.use(bodyParser.urlencoded({
    extended: true
}));

var Dashboard = require('./Dashboard');
var User = require('../user/User');


// CREATES A NEW Module
router.post('/', function (req, res) {
    Dashboard.create({
            moduleName: req.body.moduleName,
            data: {
                detailName: req.body.data.detailName,
                controlName: req.body.data.controlName,
                iconName: req.body.data.iconName
            }
        },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    Dashboard.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the Modules.");
        res.status(200).send(users);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    Dashboard.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Dashboard.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: " + user.name + " was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
router.put('/:id', /* VerifyToken, */ function (req, res) {
    Dashboard.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});


module.exports = router;