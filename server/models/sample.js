var mongoose = require('mongoose');

module.exports = mongoose.model('Sample', {
	embeded: String,
	email: String,
	name: String,
	description: String,
	date: {type: Date, default: Date.now}
});