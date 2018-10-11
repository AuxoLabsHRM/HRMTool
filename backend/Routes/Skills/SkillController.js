var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: true
}));
var Skill = require('./Skill');


router.post('/', function (req, res) {
    Skill.create({
            userId: req.body.userId,
            skill: req.body.skill,
            detail: req.body.detail
        },
        function (err, skill) {
            if (err) {
                res.status(500).json({ "ResultType": 2, "Message": "Error in add skill", "data": [] });
            } else {
                res.status(200).json({ "ResultType": 1, "Message": "Succesfully add skill", "data": skill });
            }
        });
});


router.get('/:userId', function (req, res) {
    Skill.find({ userId : req.params.userId }, function (err, skills) {
        if (err) {
            res.status(500).json({ "ResultType": 2, "Message": "Error in fetching skills", "data": [] });
        } else if (!skills) {
            res.status(404).json({ "ResultType": 1, "Message": "No skill found", "data": [] }); 
        } else {
            res.status(200).json({ "ResultType": 1, "Message": "Succesfully fetching skills", "data": skills });
        }
    });
});

router.get('/skills/:id', function (req, res) {
    Skill.findById(req.params.id, function (err, skill) {
        if (err) {
            res.status(500).json({ "ResultType": 2, "Message": "Error in fetching skill", "data": [] });
        } else if (!skill) {
            res.status(404).json({ "ResultType": 1, "Message": "No skill found", "data": [] }); 
        } else {
            res.status(200).json({ "ResultType": 1, "Message": "Succesfully fetching skill", "data": skill });
        }
    });
});


router.delete('/:id', function (req, res) {
    Skill.findByIdAndRemove(req.params.id, function (err, skill) {
        if (err) {
            res.status(500).json({ "ResultType": 2, "Message": "Error in remove skill"});
        } else {
            res.status(200).json({ "ResultType": 1, "Message": "Succesfully skill deleted"});
        }
    });
});

router.put('/:id', function (req, res) {
    Skill.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, function (err, skill) {
        if (err) {
            res.status(500).json({ "ResultType": 2, "Message": "Error in update skill", "data": [] });
        } else {
            res.status(200).json({ "ResultType": 1, "Message": "Succesfully update skill", "data": skill });
        }
    });
});


module.exports = router;