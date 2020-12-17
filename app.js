import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import exphbs from 'express-handlebars';

// __dirname in es module
// https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-when-using-the-experimental-modules-flag
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// import source
import { connectDB } from './config/db.js';
import routers from './routers/index.js';

// load config
dotenv.config({ path: './config/config.env'});
connectDB();

const PORT = process.env.PORT;  

// app
const app = express();
app.use(express.static(path.join(__dirname, 'public')))
console.log(path.join(__dirname, 'public'))
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// static folder


// routers
app.use('/', routers);

if(process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.listen(PORT, () => console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`));