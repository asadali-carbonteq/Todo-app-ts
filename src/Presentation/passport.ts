const passport = require("passport")
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
require('dotenv').config();

passport.serializeUser(function (user: any, done: any) {
    done(null, user);
});

passport.deserializeUser(function (user: any, done: any) {
    done(null, user);
});

passport.use(new GoogleStrategy({   //this data should have been save in an environment variable.
    clientID: process.env.CLIENT_ID as string,
    clientSecret: process.env.CLIENT_SECRET as string,
    callbackURL: process.env.CALLBACK_URL as string,
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