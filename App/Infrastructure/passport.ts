const passport = require("passport")
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import passportENV from './Config/passportENV';


passport.serializeUser(function (user: any, done: any) {
    done(null, user);
});

passport.deserializeUser(function (user: any, done: any) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: passportENV.CLIENT_ID,
    clientSecret: passportENV.CLIENT_SECRET,
    callbackURL: passportENV.CALLBACK_URL,
    passReqToCallback: true
},
    function (request: any, accessToken: string, refreshToken: string, profile: Profile, done: any) {
        return done(null, profile);
    }
));

export default passport;
