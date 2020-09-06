var mongoose = require("mongoose");
var questionSchema = new mongoose.Schema({
    question:{
        type: String,
        maxlength: 1000,
        required:true
      },
    answer:{
        type:String,
        required:true
    }
    
})
var Question_2 = mongoose.model("Question2", questionSchema);
module.exports = Question_2