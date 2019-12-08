//use bcryptjs instead of bcrypt(C/C++ dependance that needs to be installed)
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv/config');

const JWT_SECRET = process.env.JWT_SECRET
const User = require('./models/user');

//JSON web token strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async(payload, done) => {
    try{
        //find the user specified in token
        const user = await User.findById(payload.sub);

        //if user doesn't exist: handle it
        if(!user) {
            return done(null, false);
        }
        //otherwise, return user
        done(null, user);
    } catch(error){
        done(error, false);
    }
}));

//Local strategy
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try{
        //does user with this email exist?
        const user = await User.findOne({ email });
        //if not, handle it
        if(!user) {
            return done(null, false);
        }
        //if found: check password
        const isMatch = await user.isValidPassword(password)
        //wrong password
        if(!isMatch){
            return done(null, false);
        }
        //if correct: return the user
        done(null, user);
    } catch(error){
        done(error, false);
    } 
}));