const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/chatApp')

const userSchema = mongoose.Schema({
  userName: String,
  sid: String,
  password: String
})

const User = mongoose.model('User', userSchema)

module.exports = { User }
