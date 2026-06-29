const mongoose = require('mongoose')
const Task = require('./Tasks')
const userSchema = new mongoose.Schema({name : {type : String  , required : true} , password : {type : String , required : true , minLength : 3 } ,
    role : {type : String , required : true }
}, {toJSON : {virtuals : true} , toObject : {virtuals : true
    
}})


userSchema.methods.sayHi=function() {
    console.log(`Hello ${this.name}`)
}


userSchema.statics.findbyName = function(name) {
    return this.find({name : name})
}

userSchema.statics.findByRole= function(role) {
    return this.find({role : role})
}

// userSchema.query.byAge= function (age) {
//     return this.find({age : age})
// }


userSchema.virtual('NameRole').get(function () {return `${this.name} ${this.role}`})

userSchema.pre('findOneAndDelete' , async function (next) {
        const userID= this.getQuery()._id;
        await Task.deleteMany({userID : userID})
        next()
})
const User  = mongoose.model('User' , userSchema)



module.exports= User