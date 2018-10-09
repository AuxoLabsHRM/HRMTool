var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: true
}));
var Education = require('./Education');


router.post('/', function (req, res) {
    Education.create({
            userId: req.body.userId,
            qualification: req.body.qualification,
            institute: req.body.institute,
            fromDate: req.body.fromDate,
            endDate: req.body.endDate
        },
        function (err, education) {
            if (err) {
                res.status(500).json({ "ResultTye": 2, "Message": "Error in add education detail", "data": [] });
            } else {
                res.status(200).json({ "ResultTye": 1, "Message": "Succesfully education detail added", "data": education });
            }
        });
});


router.get('/:userId', function (req, res) {
    Education.find({ userId : req.params.userId }, function (err, educations) {
        if (err) {
            res.status(500).json({ "ResultTye": 2, "Message": "Error in fetching education details", "data": [] });
        } else if (!educations) {
            res.status(404).json({ "ResultTye": 1, "Message": "No education detail found", "data": [] }); 
        } else {
            res.status(200).json({ "ResultTye": 1, "Message": "Succesfully fetching education details", "data": educations });
        }
    });
});

router.get('/edu/:id', function (req, res) {
    Education.findById(req.params.id, function (err, education) {
        if (err) {
            res.status(500).json({ "ResultTye": 2, "Message": "Error in fetching education detail", "data": [] });
        } else if (!education) {
            res.status(404).json({ "ResultTye": 1, "Message": "No education detail found", "data": [] }); 
        } else {
            res.status(200).json({ "ResultTye": 1, "Message": "Succesfully fetching education detail", "data": education });
        }
    });
});


router.delete('/:id', function (req, res) {
    Education.findByIdAndRemove(req.params.id, function (err, education) {
        if (err) {
            res.status(500).json({ "ResultTye": 2, "Message": "Error in remove education detail"});
        } else {
            res.status(200).json({ "ResultTye": 1, "Message": "Succesfully education detail deleted"});
        }
    });
});

router.put('/:id', function (req, res) {
    Education.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, function (err, education) {
        if (err) {
            res.status(500).json({ "ResultTye": 2, "Message": "Error in update education detail", "data": [] });
        } else {
            res.status(200).json({ "ResultTye": 1, "Message": "Succesfully education detail update", "data": education });
        }
    });
});


module.exports = router;