const express = require('express');
const router2 = require('express-promise-router')();
const passport = require('passport');
const passportConfig = require('../passport');

const {validateBody, schemas} = require('../helpers/routeHelpers');
//'../' navigate back one directory
const usersController = require('../controllers/users');

router2.route('/signup')
    .post(validateBody(schemas.authSchema), usersController.signUp);

router2.route('/login')
    .post(
        validateBody(schemas.authSchema), 
        passport.authenticate(
            'local', 
            {session: false}
            ),
        usersController.signIn);

router2.route('/secret')
    .get(passport.authenticate('jwt', { session: false }), 
        usersController.secret);

router2.route('/aanwezige')
    .post(validateBody(schemas.aanwezigeSchema),
        usersController.updateEvent1);

router2.route('/aanwezige2')
    .post(validateBody(schemas.aanwezigeSchema),
        usersController.updateEvent2);

router2.route('/admin')
            .post(validateBody(schemas.aanwezigeSchema),
            usersController.logToAdmin);
module.exports = router2;