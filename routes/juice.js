var express = require('express');
const costume_controlers= require('../controllers/juice');
var router = express.Router();
/* GET costumes */
router.get('/', juice_controlers.juice_view_all_Page );
module.exports = router;
