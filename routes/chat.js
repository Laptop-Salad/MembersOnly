var express = require('express');
var router = express.Router();
var Message = require('../models/Message.js');
var mongoose = require('mongoose');


router.get('/', function(req, res, next) {
    // Get all messages in the database
    Message.find()
        .exec(function (err, arr_messages) {
            if (err) { return next(err); }
            // Successful, so render it
            res.render('chat', { title: 'Members Only Chat', user: req.user, messages: arr_messages});
        })
});

// When a post is upvotes
router.post('/upvote', (req, res, next) => {
    var id = mongoose.Types.ObjectId(req.body.upvote);

    // First find the document to update
    Message.find({_id: id}, function(err, message) {
        if (err) throw err;

        // Found, so increment the number of upvotes by 1
        var messageId = { _id : id };
        var messageUpdated = { $inc: {upvotes : 1 }};

        Message.updateOne(messageId, messageUpdated, function(err, result) {
            if (err) throw err;
            res.redirect("/chat");
        });
    });
});


// When a post is downvoted
router.post('/downvote', (req, res, next) => {
    var id = mongoose.Types.ObjectId(req.body.downvote);

    // First find the document to update
    Message.find({_id: id}, function(err, message) {
        if (err) throw err;

        // Found, so increment the number of downvotes by 1
        var messageId = { _id : id };
        var messageUpdated = { $inc: {downvotes : 1 }};

        Message.updateOne(messageId, messageUpdated, function(err, result) {
            if (err) throw err;
            res.redirect("/chat");
        });
    });
});

module.exports = router;