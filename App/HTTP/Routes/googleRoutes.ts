import express from "express";
import session from 'express-session';
import passport from "../../Infrastructure/passport";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
require('dotenv').config();
import googleSecret from "../../Infrastructure/Config/googleSecret";
import secret from "../../Infrastructure/Config/secretKey";


const googleRouter = express.Router();


const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

googleRouter.use(
    session({
        secret: googleSecret.GOOGLE_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

googleRouter.use(passport.initialize());
googleRouter.use(passport.session());

googleRouter.get("/", (req, res) => {
    res.json({ message: "you are not logged in" });
});



googleRouter.get('/google', (req, res) => {
    passport.authenticate('google', {
        scope: ['email', 'profile']
    })(req, res);
});

googleRouter.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        res.redirect('/success');
    }
)

googleRouter.get('/failed', (req, res) => {
    res.send("failed");
});

googleRouter.get("/success", isLoggedIn, (req, res) => {
    const token = jwt.sign({}, secret.SECRET_KEY);
    res.send({ token });
    res.send(`Welcome to the site`);
})

export default googleRouter;