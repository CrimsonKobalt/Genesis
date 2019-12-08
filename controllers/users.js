const User = require('../models/user');
const JWT = require('jsonwebtoken');
const url = require('url');
const Aanwezige = require('../models/aanwezige');
const Aanwezige2 = require('../models/aanwezige2');
require('dotenv/config');

const JWT_SECRET = process.env.JWT_SECRET

const twoHoursInMS = 60*60*2*1000;

signtoken = user => {
    return JWT.sign({
        iss:'Christophe',
        string: 'adminpass om aanwezigen te checken',
        keyKerstFeest: "AMDG voor alle leden",
        keyMuseum: "AMDG allen naar het museum",
        jokeKey: "rollme",
        sub: user.id,
        name: user.first_name,
        iat: new Date().getTime(),
        exp: new Date().setTime(new Date().getTime() + twoHoursInMS)
    }, JWT_SECRET)
}

module.exports = {
    signUp: async (req, res, next) => {
        //email, first name, last name, password
        // req.value.body
        
        //create a new user
        var email = req.value.body.email;
        const first_name = req.value.body.first_name;
        const last_name = req.value.body.last_name;
        const password = req.value.body.password;
        //check if user exists already
        const foundUser = await User.findOne({email});
        if(foundUser) {
            return res.status(403)
            .send({error: 'email already in use'})}

        const newUser = new User({
            first_name,
            last_name,
            email,
            password
        })

        await newUser.save();

        //instead create token
        const token = signtoken(newUser);
        //send token
        res.redirect(url.format({
            pathname:"../landing",
            query: {
                valid: "GyUrQDIze8iGuMD9v8kM",
                JWT: JSON.stringify(token),
                voornaam: req.user.first_name
            }
        }));
    },

    signIn: async (req, res, next) => {
        console.log('UsersController.signIn() called!');
        const token = signtoken(req.user);
        //res.status(200).json({token});
        console.log(JSON.stringify(token).match(/.{49,50}/g));
        res.redirect(url.format({
            pathname:"../landing",
            query: {
                valid: "GyUrQDIze8iGuMD9v8kM",
                JWT: JSON.stringify(token).match(/.{1,75}/g),
                voornaam: req.user.first_name
            }
        }));
        //res.render('secret', {name: token.name} );
    },

    secret: async (req, res, next) => {
        console.log('UsersController.secret() called!');
        res.json({ secret: "resource"});   
    },

    updateEvent1: async (req, res, next) => {
        const name = req.value.body.name;
        const found = await Aanwezige.findOne({name});
        if(found){
            res.redirect('../event4?registered=true#registered');
        } else {
            const newAanwezige = new Aanwezige({name});
            await newAanwezige.save();
            res.redirect('../event4?succesful=true#registered');
        }
    },

    updateEvent2: async (req, res, next) => {
        const namig = req.value.body.name;
        const isfound = await Aanwezige2.findOne({name: namig});
        if(isfound){
            res.redirect('../event6?registered=true#registered');
        } else{
            const newAanwezige2 = new Aanwezige2({name: namig});

            await newAanwezige2.save();
            res.redirect('../event6?succesful=true#registered');
        }
    },

    logToAdmin: async (req, res, next) => {
        const naam = req.value.body.name;
        if(naam == "AMDG allen naar het museum"){
            const namen = await Aanwezige.find({});
            console.log(namen);
            res.render('aanwezigeLijst', {"leden": namen});
        }
        else if(naam == "AMDG voor alle leden"){
            const namen = await Aanwezige2.find({});
            console.log(namen);
            res.render('aanwezigenLijst2', {"leden": namen});
        }
        else if(naam == "rollme"){
            res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        }
        else {
            res.status(400).json({
                message : "unable to find anything."
              });
        }
    }
}