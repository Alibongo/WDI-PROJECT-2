//what's happening when requests are made to routes which begin with /api
//Define routes for accidents, register, login
//functions executed in routes are defined by controllers.
const express               = require('express');
const router                = express.Router();
const authentications       = require('../controllers/authentications');
// const users = require('../controllers/users');

const staticsController     = require('../controllers/statics');
const accidentsController   = require('../controllers/accidents');

//user
router.route('/register')
.post(authentications.register);
router.route('/login')
.post(authentications.login);

//accidents - PLURALS!
router.route('/')
.get(staticsController.home);

router.route('/accidents')
.get(accidentsController.index);

module.exports = router;
