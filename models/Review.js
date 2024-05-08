// Reviews model

var ignite = require('ignite');
var Schema = ignite.Schema;

var ReviewSchema = new Schema({
    gameId: Number,
    rating: Number,
    comment: String
});

module.exports = ignite.model('Review', ReviewSchema);