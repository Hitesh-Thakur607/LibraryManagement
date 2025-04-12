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
  }
});

 const books = mongoose.model("books", schema);
module.exports = { books };
