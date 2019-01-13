const mongoose = require('mongoose')
var Schema = mongoose.Schema
const {hashPassword} = require('../helpers')

var userSchema = new Schema({
    username: String,
    password: String,
    email: String
})

userSchema.pre('save', function(next) {
    if(this.password) {
        this.password = hashPassword(this.password)
    }
    next()
})

var User = mongoose.model('User', userSchema)

module.exports = User