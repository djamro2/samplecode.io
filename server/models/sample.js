var mongoose = require('mongoose');

module.exports = mongoose.model('Sample', {
	embeded: String,
	email: String,
	title: String,
	name: String,
	description: String,
	framework: String,
	date: {type: Date, default: Date.now}
});