var mongoose = require('mongoose');

module.exports = mongoose.model('Sample', {
	embeded: {type: String, maxlength: 5000},
	email: {type: String, maxlength: 100},
	title: {type: String, maxlength: 300},
	lookupTitle: String,
	name: {type: String, maxlength: 100},
	description: {type: String, maxlength: 5000},
	framework: {type: String, maxlength: 100},
	date: {type: Date, default: Date.now}
});