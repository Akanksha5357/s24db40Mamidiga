var express = require('express');
const juice_controlers= require('../controllers/juice');
var router = express.Router();
var passport = require('passport');
/* GET juice */
router.get('/',juice_controlers.juice_view_all_Page );

/* GET detail juice page */
router.get('/detail', juice_controlers.juice_view_one_Page);

/* GET create juice page */
router.get('/create', juice_controlers.juice_create_Page);

// A little function to check if we have an authorized user and continue on or
// redirect to login.
const secured = (req, res, next) => {
    if (req.user){
    return next();
    }
    res.redirect("/login");
    }

/* GET update juice page */
router.get('/update', secured,juice_controlers.juice_update_Page);
router.post('/login',passport.authenticate('local'), function(req, res) {
    res.redirect('/');
    });

/* GET create update page */
router.get('/update', juice_controlers.juice_update_Page);

/* GET delete juice page */
router.get('/delete', juice_controlers.juice_delete_Page);


module.exports = router;