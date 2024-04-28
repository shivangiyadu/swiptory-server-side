const mongoose=require("mongoose");

 const userData=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
       
    },
    password:{
        type:String,
        required:true,
       
    },
    bookmarked_stories: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
      }
 })
 const user=mongoose.model("user",userData);
 module.exports=user;

