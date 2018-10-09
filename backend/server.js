import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
// import Technology from './models/technology';
// import EmployeeRole from './models/employeeRole';

const app = express();
const router = express.Router();
global.__root = __dirname + '/';
/** Middlewares **/
app.use(cors());
app.use(bodyParser.json()); // application/json
// app.use(bodyParser.text()); / text/plain

/** Connecting DataBase **/
/** STARTs **/
mongoose.connect('mongodb://localhost:27017/HrTool', {
    useNewUrlParser: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});
/** ENDs **/


/** Testing API **/
/** STARTs **/
app.get('/api', function (req, res) {
    res.status(200).send('API works.');
});
/** ENDs **/


/** Routing Controllers **/
/** STARTs **/

// Users Endpoint controller
var UserController = require(__root + 'Routes/user/UserController');
app.use('/api/users', UserController);

// Users signup and sigin Endpoint controller
var AuthController = require(__root + 'Routes/auth/AuthController');
app.use('/api/auth', AuthController);

// Dashboard Endpoint controller
var DashboardController = require(__root + 'Routes/dashboard/dashboardController');
app.use('/api/dashboard', DashboardController);
/** ENDs **/

// Emergency Contact Endpoint controller
var EmergencyController = require(__root + 'Routes/emergency-contact/emergencyController');
app.use('/api/emergency', EmergencyController);
/** ENDs **/

// Skill Endpoint controller
var SkillController = require(__root + 'Routes/Skills/SkillController');
app.use('/api/skill', SkillController);
/** ENDs **/

// Education Endpoint controller
var EducationController = require(__root + 'Routes/Education/EducationController');
app.use('/api/education', EducationController);
/** ENDs **/

// Dependent Endpoint controller
var DependentController = require(__root + 'Routes/Dependents/DependentController');
app.use('/api/dependent', DependentController);
/** ENDs **/

// Language Endpoint controller
var LanguageController = require(__root + 'Routes/Languages/LanguageController');
app.use('/api/language', LanguageController);
/** ENDs **/


/** Creating Server **/
/** STARTs **/
var port = process.env.PORT || 5000;
app.listen(port, () => console.log('Express server running on port' + port));
/** ENDs **/

// //Get All API
/***
// for Employee Role
router.route('/employee_role').get((req, res) => {
    EmployeeRole.find((err, technologies) => {
        if (err)
            console.log(err);
        else
            res.json(technologies);
        // console.log(res, technologies, '---isssues');
    });
});

// for Technologies
router.route('/technologies').get((req, res) => {
    Technology.find((err, technologies) => {
        if (err)
            console.log(err);
        else
            res.json(technologies);
        // console.log(res, technologies, '---isssues');
    });
});

// Single Get API
router.route('/technologies/:id').get((req, res) => {
    Technology.findById(req.params.id, (err, technology) => {
        if (err)
            console.log(err);
        else
            res.json(technology);
    });
});
// Add API
// for Employee Role
router.route('/employee_role').post((req, res) => {
    let empRole = new EmployeeRole(req.body);
    empRole.save()
        .then(empRole => {
            res.status(200).json({
                'EmployeeRole': 'Employee Role added successfully'
            });
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

// for Technologies
router.route('/technologies/add').post((req, res) => {
    let tech = new Technology(req.body);
    tech.save()
        .then(tech => {
            res.status(200).json({
                'technology': 'Technology added successfully'
            });
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});
// Update API
router.route('/technologies/update/:id').post((req, res) => {
    Technology.findById(req.params.id, (err, technology) => {
        if (!technology)
            return next(new Error('Could not load document'));
        else {
            technology.name = req.body.name;
            technology.auther = req.body.auther;
            technology.description = req.body.description;
            technology.established = req.body.established;
            technology.latestVersion = req.body.latestVersion;
            technology.docURL = req.body.docURL;

            technology.save().then(technology => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});
//Delete API
router.route('/technologies/delete/:id').delete((req, res) => {
    Technology.findByIdAndRemove({
        _id: req.params.id
    }, (err, technology) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    })
});

app.use('/', router);
*****/