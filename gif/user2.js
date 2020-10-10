var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");




var childSchema = new mongoose.Schema({
    username:String,
    password:String

});
childSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model("Child",childSchema)
