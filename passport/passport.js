const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../schema').user;

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secretKey';

module.exports = passport => {
    passport.use( new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({
            where:{
                email: jwt_payload.email
            }
        })
        .then(user => {
            if(user) return done(null, user)
            else {
                return done(null, false)
            }
        })
        .catch(err => console.log(err));
    }));
} 