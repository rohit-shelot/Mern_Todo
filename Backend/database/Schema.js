const mongoose = require('mongoose')
const { timeStamp } = require('node:console')

const TodoList_Schema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},
{timeStamps:true})

const TodoListModel = mongoose.model('All Task',TodoList_Schema)
module.exports = TodoListModel;