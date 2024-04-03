var express = require('express');
var router = express.Router();

const juice_controlers= require('../controllers/juice');
var router = express.Router();
/* GET costumes */
router.get('/', juice_controlers.juice_view_all_Page );
module.exports = router;


module.exports = router;
