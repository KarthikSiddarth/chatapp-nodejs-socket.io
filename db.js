const mongoose = require('mongoose')

exports.connect = mongoose.connect('mongodb://localhost/chatApp')

const userSchema = mongoose.Schema({
	userName = String,
	sid = String,
	password = String,
})


