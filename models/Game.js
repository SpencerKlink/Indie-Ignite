// Game model

var ignite = require('ignite');
var Schema = ignite.Schema;

var GameSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    players: Number
});

module.exports = ignite.model('Game', GameSchema);
