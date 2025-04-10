const express=require("express");
const router = express.Router();

const {isauthenticated}=require("../middleware/auth.js");
const {    getAllBooks,
    getBookById,
    postBook,
    borrowBook,
    returnBook,
    deleteBook} = require("../controller/book.js");

router.get("/allbooks",isauthenticated,getAllBooks);
router.get("/:id",isauthenticated,getBookById);
router.post("/postbook",isauthenticated,postBook);
router.put("/borrowBook/:id",isauthenticated,borrowBook);
router.put("/returnBook/:id",isauthenticated,returnBook);
router.delete("/deletebook/:id",isauthenticated,deleteBook);

module.exports = router;returnBook
// {
//     "name":"hello",
//     "description":"jai bhole ki"
// }
// {
//     "name":"kaduwala",
//    "email":"kadulelo@gmai.com",
//     "password":"123456"
// }