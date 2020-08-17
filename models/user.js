
var mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
let SALT=10


var childSchema = new mongoose.Schema({
    Name: String,
    Gender: String,
    email:{
        type:String,
        unique:true,
        lowercase:true
    } ,
    password:String,

});

//check password for login
childSchema.methods.comparePassword=function(candidatePassword,checkPassword){
    bcrypt.compare(candidatePassword,this.password, function(err,isMatch){
        if(err) return checkPassword(err)
        checkPassword(null,isMatch)
    })
}

//hashing password before putting in database
childSchema.pre('save', function (next){
    const user=this
    if(user.isModified('password')){
        user.password= bcrypt.hash(user.password,8)
    }
    next()
    
    })
var User = mongoose.model("User", childSchema);

module.exports=User