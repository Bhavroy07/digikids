const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

mongoose.connect("mongodb://localhost:27017/Child_user",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

 
const teacherSchema=mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    gender:
    {
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required:true
    }
})

teacherSchema.pre("save",function(next){
    if(!this.isModified("password")){
        return next()
    }
    this.password=bcrypt.hashSync(this.password,10)
    next()
})

teacherSchema.methods.comparePassword = function(plaintext,callback){
    return callback(null,bcrypt.compareSync(plaintext,this.password))
}

const teacherModel = mongoose.model("teacher",teacherSchema)

module.exports = teacherModel
