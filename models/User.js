var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = Schema ({
    username: { type: String, required: true },
    password: { type: String, required: true },
    bio: { type: String, required: true }
});

// Export Model
module.exports = mongoose.model('User', UserSchema);