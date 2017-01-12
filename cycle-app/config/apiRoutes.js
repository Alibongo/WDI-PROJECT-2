//what's happening when requests are made to routes which begin with /api
//define routes for accidents, register, login
//functions executed in routes are defined by controllers.
const express = require('express');
const router = express.Router();
const authentications = require('../controllers/authentications');
// const users = require('../controllers/users');

router.route('/register')
.post(authentications.register);
router.route('/login')
.post(authentications.login);

module.exports = router;
