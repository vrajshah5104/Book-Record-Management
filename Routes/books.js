// Importing Express
const express = require("express");

// Importing books.json file
const {books} = require("../Data/books.json");

// Importing users.json file here because some fields required for books.js are present in users.json
// Primary key, Foreign Key concept
const {users} = require("../Data/users.json");

// Initializing it here
const router = express.Router();

/*
    Route: /books
    Method: GET
    Description: Getting all the books
    Access: Public
    Parameters: None
*/
router.get("/", (req,res) => {
    res.status(200).json ({
        success: true,
        message: "Got all the Books :)",
        data: books
    })
})

/*
    Route: /books/issued
    Method: GET
    Description: Get all the Issued Books (Only if the user has issued any)
    Access: Public
    Parameters: None
*/
router.get("/issued", (req,res) => {
    // Khali ek value return joiti hoy toh '.find' use karat, but here we want an array back soo '.filter'
    const userWithIssuedBooks = users.filter((each) => {
        if (each.issuedBooks) {
            return each;
        }
    })
    const issuedBooks = [];
    userWithIssuedBooks.forEach((each) => {
        const book = books.find((book) => book.id = each.issuedBooks);
        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    })
    if (issuedBooks.length === 0) {
        res.status(404).json ({
            success: false,
            message: "No Books have been Issued yet"
        })
    }
    res.status(200).json ({
        success: true,
        message: "Users with Issued Books",
        data: issuedBooks
    })
})

/*
    Route: /books/:id
    Method: GET
    Description: Get books by their id
    Access: Public
    Parameters: id
*/
router.get("/:id", (req,res) => {
    const {id} = req.params;
    const book = books.find((each)=>each.id === id);

    if (!book) {
        return res.status(404).json ({
            success: false,
            messsage: "Book not found :("
        })
    }
    return res.status(200).json ({
        success: true,
        message: "Found the Book by its id",
        data: book
    })
})

// Exporting/Returning it back
module.exports = router;