const mongoose = require('mongoose')
const { validate } = require('./User')


const taskSchema = new mongoose.Schema({
    name: {type : String , required : true} ,
    description : {type : String , required: true},
    status : {type : Boolean , default : false } ,
    user : {type: mongoose.Schema.Types.ObjectId , ref :'User'} ,

})

const Task = mongoose.model('Task' , taskSchema)

module.exports = Task