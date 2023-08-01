const passport = require("passport")
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';

passport.serializeUser(function (user: any, done: any) {
    done(null, user);
});

passport.deserializeUser(function (user: any, done: any) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "980408164835-6pcvbpl2n2a9i8e7646seaeg954lsd55.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8080/google/callback",
    passReqToCallback: true
},
    function (request: any, accessToken: string, refreshToken: string, profile: Profile, done: any) {
        return done(null, profile);
    }
));

export default passport;

/*
Google Oauth Client:
Client ID       :    980408164835-6pcvbpl2n2a9i8e7646seaeg954lsd55.apps.googleusercontent.com
Client Secret   :    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
*/