var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());
var Applyleave = require('./applyleave');

router.post('/', function(req, res) {
    Applyleave.create({
        userId: req.body.userId,
        fromDate: req.body.fromDate,
        toDate: req.body.toDate,
        leavetype: req.body.leavetype,
        note: req.body.note,
        leave: req.body.leave
    },
    function (err, Applyleave) {
        if (err) {
            res.status(500).json({ "ResultTye": 2, "Message": "Error occured while applying leave", "data": [] });
        } else {
            res.status(200).json({ "ResultTye": 1, "Message": "Leave applied successfully", "data": Applyleave });
        }
    });
    
});

router.get('/:userId', function(req, res){
    Applyleave.find({ userId : req.params.userId }, function (err, Applyleave) {
        if (err) {
            res.status(500).json({ "ResultTye": 2, "Message": "Error occurred while getting leave detail", "data": [] });
        } else if (!Applyleave) {
            res.status(404).json({ "ResultTye": 1, "Message": "No records found", "data": [] }); 
        } else {
            res.status(200).json({ "ResultTye": 1, "Message": "Leave details get successfully", "data": Applyleave });
        }
    }
    );
});

module.exports = router;