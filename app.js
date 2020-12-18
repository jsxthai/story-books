import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env'});
import morgan from 'morgan';
import exphbs from 'express-handlebars';
import passport from 'passport';
import session from 'express-session';

// passport config
import { applyPassportStrategy } from './config/passport.js';
applyPassportStrategy(passport);

// __dirname in es module
// https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-when-using-the-experimental-modules-flag
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// import source
import { connectDB } from './config/db.js';

//import router
import mainRouter from './routers/index.js';
import authRouter from './routers/auth.js';

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
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// routers
app.use('/', mainRouter);
app.use('/auth', authRouter);

if(process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.listen(PORT, () => console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`));