const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

mongoose.connect("mongodb://localhost:27017/Child_user",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

 
const expertSchema=mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    }

})

const expertModel = mongoose.model("expert",expertSchema)

module.exports = expertModel
