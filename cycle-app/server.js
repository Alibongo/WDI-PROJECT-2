//refering to files in config
const express    = require('express');
const morgan     = require('morgan');
const bodyParser = require('body-parser');
const cors       = require('cors');
const mongoose   = require('mongoose');

//authentification
const app        = express();
const config     = require('./config/config');
const apiRouter     = require('./config/apiRoutes');
const webRouter     = require('./config/webRoutes');

mongoose.connect(config.db);

app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', apiRouter);
app.use('/', webRouter);

app.listen(config.port, () => console.log(`Express started on port: ${config.port}`));
