//what's being done when user navigates to the homepage (//the url)
//A get request to the url to execute the 'home' function in the statics controller.
//router.route('/').get(statics.home)
const express         = require('express');
const router          = express.Router();
const statics         = require('../controllers/statics');

router.route('/')
.get(statics.home);

module.exports = router;
