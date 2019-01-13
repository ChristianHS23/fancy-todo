const mongoose = require('mongoose')
var Schema = mongoose.Schema

var todoSchema = new Schema({
    name : String,
    description : String,
    status : {
        type: String,
        default: 'ongoing'
    },
    due_date : Date,
    user : {
        type: Schema.Types.ObjectId,
        ref : 'User'
    }
})

var Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo