var express = require('express');
var router = express.Router();
var passport = require('passport');
const juice_controlers = require('../controllers/juice');

const secured = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.redirect("/login");
};


router.get('/', juice_controlers.juice_view_all_Page);


router.get('/detail', secured, juice_controlers.juice_view_one_Page);

router.get('/create', juice_controlers.juice_create_Page);


router.get('/update', secured, juice_controlers.juice_update_Page);


router.get('/delete', secured, juice_controlers.juice_delete_Page);

module.exports = router;
