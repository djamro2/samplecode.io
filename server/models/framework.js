var mongoose = require('mongoose');

module.exports = mongoose.model('Framework', {
	name:  String,
	description: {type: String, default: 'no description yet, will add soon'},
	date: {type: Date, default: Date.now}
});