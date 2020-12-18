import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env'});
import morgan from 'morgan';
import exphbs from 'express-handlebars';
import passport from 'passport';
import session from 'express-session';
import methodOverride from 'method-override';
import {default as connectMongo} from 'connect-mongo';
import mongoose from 'mongoose';
import { applyPassportStrategy } from './config/passport.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import { formatDate, truncate, stripTags, editIcon, select } from './helpers/hbs.js';
//import router
import mainRouter from './routers/index.js';
import authRouter from './routers/auth.js';
import storiesRouter from './routers/stories.js';

// https://stackoverflow.com/questions/39052429/es6-how-to-import-connect-mongo-session
const MongoStore = connectMongo(session);

// passport config
applyPassportStrategy(passport);

// __dirname in es module
// https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-when-using-the-experimental-modules-flag
const __dirname = dirname(fileURLToPath(import.meta.url));

// load config
connectDB();

const PORT = process.env.PORT;  

// app
const app = express();
console.log(path.join(__dirname, 'public'));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// method override
app.use(methodOverride((req, res) => {
    console.log('req pk', req)
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;    
    }
}));

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// handlebars
// set default layout main.hbs file
app.engine('.hbs', exphbs({ 
    defaultLayout: 'main', 
    extname: '.hbs', 
    helpers: {
        formatDate,
        truncate,
        stripTags,
        editIcon, 
        select
}}));
app.set('view engine', '.hbs');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// global var
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
})

// routers
app.use('/', mainRouter);
app.use('/auth', authRouter);
app.use('/stories', storiesRouter);

if(process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.listen(PORT, () => console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`));