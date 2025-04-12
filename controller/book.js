const { books } = require("../Model/books.js");

// GET all books (available only)
const getAllBooks = async (req, res) => {
    try {
        const allBooks = await books.find(); // ← renamed variable
        if (allBooks.length === 0) {
            return res.status(200).json({ message: "No books available" });
        }
        res.status(200).json(allBooks);
    } catch (error) {
        console.error("Get All Books Error:", error); // also add this for future debugging
        res.status(500).json({ error: "Server error" });
    }
};


// GET book by ID
const getBookById = async (req, res) => {
    try {
        const book = await books.findById(req.params.id).select('+description');
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ message: "Invalid book ID" });
    }
};

// POST a new book
const postBook = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newBook = new books({ name, description });
        await newBook.save();

        res.status(201).json({
            success: true,
            message: "Book added successfully",
            book: newBook
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PATCH borrow a book
const borrowBook = async (req, res) => {
    try {
        const book = await books.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        if (book.borrowed) {
            return res.status(400).json({ message: "Book already borrowed" });
        }

        book.borrowed = true;
        await book.save();
        res.status(200).json({ message: "Book borrowed", book });
    } catch (error) {
        res.status(400).json({ message: "Invalid book ID" });
    }
};

// PATCH return a book
const returnBook = async (req, res) => {
    try {
        const book = await books.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        if (!book.borrowed) {
            return res.status(400).json({ message: "Book was not borrowed" });
        }

        book.borrowed = false;
        await book.save();
        res.status(200).json({ message: "Book returned", book });
    } catch (error) {
        res.status(400).json({ message: "Invalid book ID" });
    }
};

// DELETE a book
const deleteBook = async (req, res) => {
    try {
        const book = await books.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book successfully deleted!" });
    } catch (error) {
        res.status(400).json({ message: "Invalid book ID" });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    postBook,
    borrowBook,
    returnBook,
    deleteBook
};
