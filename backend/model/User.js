const mongoose= require('mongoose'); // import mongoose
const { Schema } = mongoose;

// create new schema
const userSchema = new Schema({
    
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
  });

  const User =mongoose.model('user',userSchema);  // create model
  module.exports=User // export module