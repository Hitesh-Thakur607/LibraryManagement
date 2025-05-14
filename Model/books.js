// const mongoose =require( "mongoose");
// const schema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   borrowed: {
//     type: Boolean,
//     required: true,
//     default: false
//   },
//   createdate: {
//     type: Date,
//     required: true,
//     default: Date.now
//   }
// });

//  const books = mongoose.model("books", schema);
// module.exports = { books };
const mongoose =require( "mongoose");
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  borrowed: {
    type: Boolean,
    required: true,
    default: false
  },
  createdate: {
    type: Date,
    required: true,
    default: Date.now
  },
  borrowedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // this should match your actual model name (e.g., "User")
    default: null
  },  
  borrowDate: {
    type: Date,
    default: null
  },
  returnDate: {
    type: Date,
    default: null
  }
});

 const books = mongoose.model("books", schema);
module.exports = { books };
  
