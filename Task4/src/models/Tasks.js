const mongoose = require('mongoose')



const taskSchema = new mongoose.Schema({
    name: {type : String , required : true , unique : true} ,
    description : {type : String , required: true},
    status : {type : Boolean , default : false } ,
    userID : {type: mongoose.Schema.Types.ObjectId , ref :'User' , required : true} ,
    
})

const Task = mongoose.model('Task' , taskSchema)

module.exports = Task