import express from "express";
import userRouter from "./routes/userRoutes"
import todoRouter from "./routes/todoRoutes";
import passport from './passport';
import session from 'express-session';
import { Request, Response, NextFunction } from "express";
//const cookieSession = require('cookie-session');



const app = express();
const port = 8080

app.use(express.json());
//

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

app.use(
    session({
        secret: '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',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.json({ message: "you are not logged in" });
});

app.get('/failed', (req, res) => {
    res.send("failed");
});

app.get("/success", isLoggedIn, (req, res) => {
    res.send(`Welcome to the site`);
})

app.get('/google', (req, res) => {

    passport.authenticate('google', {
        scope: ['email', 'profile']
    })(req, res);


});

app.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        res.redirect('/success');
    }
);

/*app.get("/logout", (req: Request, res: Response) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})*/

//

app.listen(port, () => {
    console.log("Server is running on port 8080")
});

app.use(userRouter);
app.use(todoRouter);



/*

Google Oauth Client:

Client ID:  980408164835-6pcvbpl2n2a9i8e7646seaeg954lsd55.apps.googleusercontent.com
Client Secret:  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

*/