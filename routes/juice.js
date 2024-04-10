var express = require('express');
const juice_controlers= require('../controllers/juice');
var router = express.Router();
/* GET juice */
router.get('/',juice_controlers.juice_view_all_Page );

/* GET detail juice page */
router.get('/detail', juice_controlers.juice_view_one_Page);

/* GET create juice page */
router.get('/create', juice_controlers.juice_create_Page);

/* GET create update page */
router.get('/update', juice_controlers.juice_update_Page);

/* GET delete juice page */
router.get('/delete', juice_controlers.juice_delete_Page);


module.exports = router;