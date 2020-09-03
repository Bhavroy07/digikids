var mongoose = require("mongoose");
var questionSchema = new mongoose.Schema({
    question:{
        type: String,
        maxlength: 1000,
        required:true
      },
    option1:{
        type:String,
        required:true
    },
    option2:{
        type:String,
        required:true
    },
    option3:{
        type:String,
        required:true
    },
    option4:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    }
    
})
var Question_1 = mongoose.model("Question1", questionSchema);
module.exports = Question_1