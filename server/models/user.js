const mongoose = require('mongoose')
var Schema = mongoose.Schema
const {hashPassword} = require('../helpers')

var userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    todolists: [{
        type: Schema.Types.ObjectId ,
        ref : 'Todo'
    }]
})

userSchema.pre('save', function(next) {
    this.password = hashPassword(this.password)
    next()
})

var User = mongoose.model('User', userSchema)

module.exports = User