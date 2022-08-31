var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true},
    sender: { type: String, required: true},
    upvotes: { type: Number, required: true},
    downvotes: { type: Number, required: true},
});

// Export model
module.exports = mongoose.model('Message', MessageSchema);