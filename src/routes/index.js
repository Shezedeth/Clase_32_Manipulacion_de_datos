const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

/* GET home page. */

router.get('/', indexController.home);

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Digital Movies' });
// });

module.exports = router;
