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
var Question_3 = mongoose.model("Question3", questionSchema);
module.exports = Question_3