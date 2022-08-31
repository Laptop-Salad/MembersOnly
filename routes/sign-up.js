var express = require('express');
var router = express.Router();
var User = require('../models/User.js');
var bcrypt = require('bcrypt');

/* GET sign-up page */
router.get('/', function(req, res) {
    res.render('sign-up'), { title: 'New Member'};
});

// When user submits sign-up form
router.post('/', (req, res, next) => {

    // Hash password and add salt
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
            return next(err);
        }

        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            bio: 'Hey there, Im a member!'
        }).save(err => {
            if (err) {
                return next(err);
            }
    
            res.redirect('/');
        });
    });
});

module.exports = router;