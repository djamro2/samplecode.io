var mongoose = require('mongoose');
var textSearch = require('mongoose-text-search');

var sampleSchema  = mongoose.Schema({
	embeded: {type: String, maxlength: 5000},
	email: {type: String, maxlength: 100},
	title: {type: String, maxlength: 300},
	lookupTitle: String,
	name: {type: String, maxlength: 100},
	description: {type: String, maxlength: 5000},
	framework: {type: String, maxlength: 100},
	date: {type: Date, default: Date.now}
});

sampleSchema.plugin(textSearch);

sampleSchema.index({title: 'text'});

module.exports = mongoose.model('Sample', sampleSchema);