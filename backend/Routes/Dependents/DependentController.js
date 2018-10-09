var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());
// router.use(bodyParser.text());
var Dependent = require('./Dependent');


router.post('/', function (req, res) {
    console.log(req, 'Request');
    Dependent.create({
            userId: req.body.userId,
            name: req.body.name,
            relationship: req.body.relationship,
            dateOfBirth: req.body.dateOfBirth
        },
        function (err, dependent) {
            if (err) {
                res.status(500).json({ "ResultTye": 2, "Message": "Error in add dependent detail", "data": [] });
            } else {
                res.status(200).json({ "ResultTye": 1, "Message": "Succesfully dependent detail added", "data": dependent });
            }
        });
});


router.get('/:userId', function (req, res) {
    Dependent.find({ userId : req.params.userId }, function (err, dependents) {
        if (err) {
            res.status(500).json({ "ResultTye": 2, "Message": "Error in fetching dependent details", "data": [] });
        } else if (!dependents) {
            res.status(404).json({ "ResultTye": 1, "Message": "No dependent detail found", "data": [] }); 
        } else {
            res.status(200).json({ "ResultTye": 1, "Message": "Succesfully fetching dependent details", "data": dependents });
        }
    });
});

router.get('/dep/:id', function (req, res) {
    Dependent.findById(req.params.id, function (err, dependent) {
        if (err) {
            res.status(500).json({ "ResultTye": 2, "Message": "Error in fetching dependent detail", "data": [] });
        } else if (!dependent) {
            res.status(404).json({ "ResultTye": 1, "Message": "No dependent detail found", "data": [] }); 
        } else {
            res.status(200).json({ "ResultTye": 1, "Message": "Succesfully fetching dependent detail", "data": dependent });
        }
    });
});


router.delete('/:id', function (req, res) {
    Dependent.findByIdAndRemove(req.params.id, function (err, dependent) {
        if (err) {
            res.status(500).json({ "ResultTye": 2, "Message": "Error in remove dependent detail"});
        } else {
            res.status(200).json({ "ResultTye": 1, "Message": "Succesfully dependent detail deleted"});
        }
    });
});

router.put('/:id', function (req, res) {
    Dependent.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, function (err, dependent) {
        if (err) {
            res.status(500).json({ "ResultTye": 2, "Message": "Error in update dependent detail", "data": [] });
        } else {
            res.status(200).json({ "ResultTye": 1, "Message": "Succesfully dependent detail update", "data": dependent });
        }
    });
});


module.exports = router;