var express = require('express');
var router = express.Router();
var fs = require('fs');
var gebruiker = require('../models/user');
const url = require('url');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/index', function (req, res, next) {
    res.render('index');
})

router.get('/activiteiten', function (req, res, next) {
    res.render('activiteiten');
});

router.get('/contact', function (req, res, next) {
    res.render('contact');
});

router.get('/events', function (req, res, next) {
    res.render('events');
});

router.get('/event1', function (req, res, next) {
    res.render('events-event1');
});

router.get('/event2', function (req, res, next) {
    res.render('events-event2');
});

router.get('/event3', function (req, res, next) {
    res.render('events-event3');
});

router.get('/event4', function (req, res, next) {
    const registered = req.query.registered;
    const succesful = req.query.succesful;
    res.render('events-event4', {registered, succesful});
});

router.get('/event5', function (req, res, next) {
    res.render('events-event5');
});

router.get('/event6', function (req, res, next) {
    const registered = req.query.registered;
    const succesful = req.query.succesful;
    res.render('events-event6', {registered, succesful});
});

router.get('/login', function (req, res, next) {
    res.render('login', {valid: req.body.valid});
});

router.get('/signup', function (req, res, next) {
    res.render('signup');
});

router.get('/landing', function(req, res, next) {
    const voornaam = req.query.voornaam;
    const challenge = req.query.JWT;
    console.log(req.query.valid);
    console.log('GyUrQDIze8iGuMD9v8kM');
    if(req.query.valid == 'GyUrQDIze8iGuMD9v8kM'){
        res.render('landing', {
            "name": voornaam,
            "JWT": challenge
        })
    } else {
        res.redirect('/');
    }
});

router.get('/admin', function(req, res, next) {
    const valid = req.query.request;
    if(valid == "show"){
        res.render('adminlogin');
    }
    else{
        res.redirect('/login');
    }
});

router.get('/gebruiksvoorwaarden', function (request, response) {
    var tempFile = "./public/gebruiksvoorwaarden.pdf";
    fs.readFile(tempFile, function (err, data) {
        response.contentType("application/pdf");
        response.send(data);
    });
});

router.get('/*', function(req, res, next) {
    res.redirect('/');
})

module.exports = router;
