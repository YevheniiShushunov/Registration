const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const db = require('../db');


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.jwt 
}

const pasport = passport => {
    passport.use(
        new JwtStrategy(options, (jwt_payload, done) => {
            try {
                db.query("SELECT id, email, login, real_name FROM user WHERE id = ?",
                [jwt_payload.userId], 
                    (error, rows, fields) => {
                    if(error) {
                        done(error, false);
                    } else {
                        const user = rows
                        if(user) {
                            console.log(user)
                            done(null, user)
                        } else {
                             done(null, false)
                        }
                    }
                })
            } catch(e) {
                console.log(e);
            }
        })
    )
}
module.exports = pasport;