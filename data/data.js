const mongoose =require( "mongoose");

 const connectdb=()=>{
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "LibraryManagement",
  })
  .then((c) => console.log('Database Connected TO ',c.connection.host))
  .catch((e) => console.log(e));
}
module.exports = connectdb;