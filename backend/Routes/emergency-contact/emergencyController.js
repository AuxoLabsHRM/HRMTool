var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var _ = require('lodash');

router.use(bodyParser.urlencoded({
    extended: true
}));
var Emergency = require('./emergency');


router.post('/', function (req, res) {
    Emergency.create({
            userId: req.body.userId,
            name: req.body.name,
            relationship: req.body.relationship,
            homePhone: req.body.homePhone,
            mobilePhone: req.body.mobilePhone
        },
        function (err, contact) {
            if (err) {
                res.status(500).json({ "ResultTye": 2, "Message": "Error in add emergency contact", "data": [] });
            } else {
                res.status(200).json({ "ResultTye": 1, "Message": "Succesfully add emergency contact", "data": contact });
            }
        });
});


router.get('/:userId', function (req, res) {
    Emergency.find({ userId : req.params.userId }, function (err, contacts) {
        // var uniqContacts = _.uniqBy(contacts, 'name');
        if (err) {
            res.status(500).json({ "ResultTye": 2, "Message": "Error in fetching emergency contact", "data": [] });
        } else if (!contacts) {
            res.status(404).json({ "ResultTye": 1, "Message": "No Contact found", "data": [] }); 
        } else {
            res.status(200).json({ "ResultTye": 1, "Message": "Succesfully fetching emergency contact", "data": contacts });
        }
    });
});

router.get('/contact/:id', function (req, res) {
    Emergency.findById(req.params.id, function (err, contact) {
        if (err) {
            res.status(500).json({ "ResultTye": 2, "Message": "Error in fetching emergency contact", "data": [] });
        } else if (!contact) {
            res.status(404).json({ "ResultTye": 1, "Message": "No Contact found", "data": [] }); 
        } else {
            res.status(200).json({ "ResultTye": 1, "Message": "Succesfully fetching emergency contact", "data": contact });
        }
    });
});


router.delete('/:id', function (req, res) {
    Emergency.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) {
            res.status(500).json({ "ResultTye": 2, "Message": "Error in remove emergency contact"});
        } else {
            res.status(200).json({ "ResultTye": 1, "Message": "Succesfully emergency contact deleted"});
        }
    });
});

router.put('/:id', function (req, res) {
    Emergency.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, function (err, contact) {
        if (err) {
            res.status(500).json({ "ResultTye": 2, "Message": "Error in update emergency contact", "data": [] });
        } else {
            res.status(200).json({ "ResultTye": 1, "Message": "Succesfully update emergency contact", "data": contact });
        }
    });
});


module.exports = router;