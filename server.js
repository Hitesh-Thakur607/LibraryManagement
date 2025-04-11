const express = require("express");
const dotenv = require("dotenv");
const connectdb = require("./data/data.js");
const cookieParser = require("cookie-parser");
const  cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000", // or whatever your frontend is
    credentials: true,
}));

// ✅ Correct .env path
dotenv.config({ path: "./config.env" });

// ✅ Check if MONGO_URI is loading
// console.log("Mongo URI:", process.env.MONGO_URI);

connectdb();

app.get('/', (req, res) => {
    res.send("hello world");
});

const userRoutes = require("./routes/user.js");
const bookRoutes = require("./routes/book.js");

app.use("/", userRoutes);
app.use("/books", bookRoutes);

app.listen(port, () => {
    console.log(`Server started at ${port}`);
});
