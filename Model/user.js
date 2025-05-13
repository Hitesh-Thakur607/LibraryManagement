// const mongoose =require( "mongoose");
// const schema = new mongoose.Schema({
//   name: String,
//   email: {
//     type:String,
//     required:true,
//     unique:true
//   },
//   password: {type:String,
//     required:true,
//       select:false,
//   },
//   createdate:{
//     type:Date,
//     required:true,
//     default:Date.now
//   },
//   role: {
//     type: String,
//     default: "user"
//   }
// });
//  const users=mongoose.model("users",schema);
//  module.exports={users};
const mongoose =require( "mongoose");
const schema = new mongoose.Schema({
  name: String,
  email: {
    type:String,
    required:true,
    unique:true
  },
  password: {type:String,
    required:true,
      select:false,
  },
  createdate:{
    type:Date,
    required:true,
    default:Date.now
  },
  role: {
    type: String,
    default: "user"
  },
  isVerified: {
    type: Boolean,
    default: false
  },
});
 const users=mongoose.model("users",schema);
 module.exports={users};
