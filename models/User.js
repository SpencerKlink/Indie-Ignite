// User model

var ignite = require('ignite');
var Schema = ignite.Schema;

var UserSchema = new Schema({
    username: String,
    password: String
});

module.exports = ignite.model('User', UserSchema);