var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());
var ApplyLeave = require('./applyleave');
var AvailableLeave = require('./availableLeave');

router.post('/', function (req, res) {
    ApplyLeave.create({
        user: req.body.userId,
        userId: req.body.userId,
        fromDate: req.body.fromDate,
        toDate: req.body.toDate,
        leaveType: req.body.leaveType,
        note: req.body.note,
        days: req.body.days
    },
        function (err, Leave) {
            if (err) {
                res.status(500).json({ "ResultType": 2, "Message": "Error occured while applying leave"});
            } else {
                AvailableLeave.find({ userId: req.body.userId }, function (err, Leaves) {
                    console.log(Leaves, 'Leaves');
                    if (err) {
                        res.status(500).json({ "ResultType": 2, "Message": "Error occured while applying leave"});
                    } else {
                        if (req.body.leaveType.name == ("sickLeave" || "casualLeave")) {
                            if (req.body.leaveType.name == "sickLeave") {
                                let count = Leaves[0].sickLeave - req.body.days;
                                var leavevalues = { $set: { sickLeave: count } };
                            } else if (req.body.leaveType.name == "casualLeave") {
                                let count = Leaves[0].casualLeave - req.body.days;
                                var leavevalues = { $set: { casualLeave: count } };
                            }
                            AvailableLeave.updateOne({ userId: req.body.userId }, leavevalues, function (err, response) {
                                if (err) {
                                    res.status(500).json({ "ResultType": 2, "Message": "Error occured while applying leave" });
                                } else {
                                    res.status(200).json({ "ResultType": 1, "Message": "Leave applied successfully" });
                                }
                            });
                        } else {
                            res.status(200).json({ "ResultType": 1, "Message": "Leave applied successfully" });
                        }
                    }
                })
            }
        });

});

router.get('/:userId', function (req, res) {
    ApplyLeave.find({ "userId": req.params.userId }).populate('user').exec(function (err, Leaves) {
        if (err) {
            res.status(500).json({ "ResultType": 2, "Message": "Error occurred while getting leave detail", "data": [] });
        } else if (!Leaves) {
            res.status(404).json({ "ResultType": 1, "Message": "No records found", "data": [] });
        } else {
            res.status(200).json({ "ResultType": 1, "Message": "Leave details get successfully", "data": Leaves });
        }
    });
    // ApplyLeave.aggregate([
    //     { "$match": { "userId" : req.params.userId } },
    //     {
    //         $lookup:
    //         {
    //             from: 'User',
    //             localField: "userId",
    //             foreignField: "_id",
    //             as: 'user'
    //         }
    //     }
    // ]).exec((err, Leaves) => {
    //     if (err) {
    //         res.status(500).json({ "ResultTye": 2, "Message": "Error occurred while getting leave detail", "data": [] });
    //     } else if (!Leaves) {
    //         res.status(404).json({ "ResultTye": 1, "Message": "No records found", "data": [] }); 
    //     } else {
    //         res.status(200).json({ "ResultTye": 1, "Message": "Leave details get successfully", "data": Leaves });
    //     }
    // });
});

router.put('/status/:id', function (req, res) {
    ApplyLeave.findByIdAndUpdate(req.params.id, req.body, {
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