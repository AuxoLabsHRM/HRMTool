var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: true
}));
var Language = require('./Language');


router.post('/', function (req, res) {
    Language.create({
            userId: req.body.userId,
            language: req.body.language,
            reading: req.body.reading,
            speaking: req.body.speaking,
            writing: req.body.writing
        },
        function (err, language) {
            if (err) {
                res.status(500).json({ "ResultType": 2, "Message": "Error in add language detail", "data": [] });
            } else {
                res.status(200).json({ "ResultType": 1, "Message": "Succesfully language detail added", "data": language });
            }
        });
});


router.get('/:userId', function (req, res) {
    Language.find({ userId : req.params.userId }, function (err, languages) {
        if (err) {
            res.status(500).json({ "ResultType": 2, "Message": "Error in fetching language details", "data": [] });
        } else if (!languages) {
            res.status(404).json({ "ResultType": 1, "Message": "No language detail found", "data": [] }); 
        } else {
            res.status(200).json({ "ResultType": 1, "Message": "Succesfully fetching language details", "data": languages });
        }
    });
});

router.get('/lan/:id', function (req, res) {
    Language.findById(req.params.id, function (err, language) {
        if (err) {
            res.status(500).json({ "ResultType": 2, "Message": "Error in fetching language detail", "data": [] });
        } else if (!language) {
            res.status(404).json({ "ResultType": 1, "Message": "No language detail found", "data": [] }); 
        } else {
            res.status(200).json({ "ResultType": 1, "Message": "Succesfully fetching language detail", "data": language });
        }
    });
});


router.delete('/:id', function (req, res) {
    Language.findByIdAndRemove(req.params.id, function (err, language) {
        if (err) {
            res.status(500).json({ "ResultType": 2, "Message": "Error in remove language detail"});
        } else {
            res.status(200).json({ "ResultType": 1, "Message": "Succesfully language detail deleted"});
        }
    });
});

router.put('/:id', function (req, res) {
    Language.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, function (err, language) {
        if (err) {
            res.status(500).json({ "ResultType": 2, "Message": "Error in update language detail", "data": [] });
        } else {
            res.status(200).json({ "ResultType": 1, "Message": "Succesfully language detail update", "data": language });
        }
    });
});


module.exports = router;