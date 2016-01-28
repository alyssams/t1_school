var express = require('express');
var router = express.Router();
var util = require('util');
var basicURLs = {
    '/about': 'about',
    '/schedule': 'schedule'
};
var app = express();

router.get('/', function(req, res, next) {
    res.render('C_homepage', {
        body: "Hello! Welcome to your homepage page!",
        layout: "L_homepage"
    });
});


router.get('/schedule', function(req, res, next) {
    res.render('C_schedule', {
        body: "Hello! Welcome to your schedule page!",
        layout: "L_schedule"
    });
});

router.get('/about', function(req, res, next) {
    res.render('C_about', {
        body: "Hello! Welcome to your about page!",
        layout: "L_about"
    });
});

module.exports = router;
