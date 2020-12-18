import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env'});
import morgan from 'morgan';
import exphbs from 'express-handlebars';
import passport from 'passport';
import session from 'express-session';
import {default as connectMongo} from 'connect-mongo';
import mongoose from 'mongoose';
import { applyPassportStrategy } from './config/passport.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
//import router
import mainRouter from './routers/index.js';
import authRouter from './routers/auth.js';

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

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// handlebars
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}));
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

// routers
app.use('/', mainRouter);
app.use('/auth', authRouter);

if(process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.listen(PORT, () => console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`));