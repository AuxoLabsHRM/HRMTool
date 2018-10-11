var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());
var AvailableLeave = require('./availableLeave');

router.get('/:userId', function(req, res){
    AvailableLeave.find({ userId : req.params.userId }, function (err, Leave) {
        if (err) {
            res.status(500).json({ "ResultType": 2, "Message": "Error occurred while getting leave detail", "data": [] });
        } else if (!Leave) {
            res.status(404).json({ "ResultType": 1, "Message": "No records found", "data": [] }); 
        } else {
            res.status(200).json({ "ResultType": 1, "Message": "Leave details get successfully", "data": Leave });
        }
    }
    );
});

router.put('/:id', function (req, res) {
    AvailableLeave.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, function (err, Leave) {
        if (err) {
            res.status(500).json({ "ResultType": 2, "Message": "Error in update Leave detail", "data": [] });
        } else {
            res.status(200).json({ "ResultType": 1, "Message": "Succesfully Leave detail update", "data": Leave });
        }
    });
});

module.exports = router;