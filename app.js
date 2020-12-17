import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import exphbs from 'express-handlebars';

// __dirname in es module
import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// import source
import { connectDB } from './config/db.js';
import routers from './routers/index.js';

// load config
dotenv.config({ path: './config/config.env'});
connectDB();

const PORT = process.env.PORT;  

// app
const app = express();
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// routers
app.use('/', routers);

if(process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.listen(PORT, () => console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`));