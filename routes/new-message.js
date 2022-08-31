var express = require('express');
var router = express.Router();
var Message = require('../models/Message.js');
const { check, validationResult } = require('express-validator');

router.get('/', function(req, res, next) {
    res.render('message-form', { title: 'New message', user: req.user });
});

router.post('/', 
    check('title').isLength({ min: 1}).trim().escape(), 
    check('text').isLength({ min: 1}).trim().escape(), 
    
    (req, res, next) => {

    const message = new Message({
        title: req.body.title,
        text: req.body.text,
        sender: req.user.username,
        upvotes: 0,
        downvotes: 0
    }).save(err => {
        if (err) {
            return next(err);
        }

        res.redirect('/chat')
    })
});


// Export module
module.exports = router;