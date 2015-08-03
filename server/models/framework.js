var mongoose = require('mongoose');

module.exports = mongoose.model('Framework', {
	name:  String,
	date: {type: Date, default: Date.now}
});