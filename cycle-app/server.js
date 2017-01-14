//refering to files in config
const express    = require('express');
const morgan     = require('morgan');
const bodyParser = require('body-parser');
const cors       = require('cors');
const mongoose   = require('mongoose');
//const port     = process.env.PORT || 3000;

//authentification
const app        = express();
const config     = require('./config/config');
const apiRouter     = require('./config/apiRoutes');
const webRouter     = require('./config/webRoutes');

mongoose.connect(config.db);

// **************OVER THINKING ALERT!!!!!****************
//********CHECK WHERE THIS GOES AND HOW IT RELATES WITH MONGOOSE.CONNECT(CONFIG.DB)!!!!!!!!!!!!!!****************
//**********SEE MARKED OUT PORT VARIABLE AT TOP***********
// const databaseURL = process.env.MONGOLAB_URL || 'mongodb://localhost:27017/gymap';
// mongoose.connect(databaseURL);
//****SEE THAT THE LISTEN EXECUTION IS DIFFERENT ALSO*****



app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', apiRouter);
app.use('/', webRouter);

app.listen(config.port, () => console.log(`Express started on port: ${config.port}`));
