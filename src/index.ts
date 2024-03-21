import express, { Request, Response } from 'express';
import { configureRoutes } from './routes/routes';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import passport from 'passport';
import { configurePassport } from './passport/passport';
import mongoose from 'mongoose';

const app = express();
const port = 3000;
const dbUrl = 'mongodb://localhost:5000/my_db'

mongoose.connect(dbUrl).then(_ => {
    console.log('Successfully connected to MongoDB.');
}).catch(error => {
    console.log(error);    
});

// bodyParser
app.use(bodyParser.urlencoded({extended: true}));

// cookiesParser
app.use(cookieParser());

// session
const sessionOpitons: expressSession.SessionOptions = {
    secret: 'testsecret',
    resave: false,
    saveUninitialized: false
}
app.use(expressSession(sessionOpitons));

app.use(passport.initialize());
app.use(passport.session());

configurePassport(passport);

app.use('/app', configureRoutes(passport, express.Router()));

app.listen(port, () => {
    console.log(`The app is running on port ${port}`);
});
